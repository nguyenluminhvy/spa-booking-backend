import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationEvent } from 'src/notifications/notification-event.enum';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  private db = admin.firestore();

  async getOrCreateConversation(userId: number) {
    const convoRef = this.db.collection('conversations').doc(String(userId));

    const doc = await convoRef.get();

    if (doc.exists) {
      return {
        code: 0,
        message: 'SUCCESS',
        data: {
          id: doc.id,
        },
      };
    }

    const now = admin.firestore.FieldValue.serverTimestamp();

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    if (!user) {
      return {
        code: -1,
        message: 'User not found',
      };
    }

    const newConvo = {
      userId,
      userName: user?.name || '',
      assignedTo: null,
      status: 'OPEN',
      lastMessage: 'Chào bạn 👋 Spa có thể hỗ trợ gì cho bạn?',
      lastSenderId: 0,
      createdAt: now,
      updatedAt: now,
    };

    const batch = this.db.batch();

    batch.set(convoRef, newConvo);

    // await convoRef.set(newConvo);

    const messageRef = convoRef.collection('messages').doc();

    batch.set(messageRef, {
      content: 'Chào bạn 👋 Spa có thể hỗ trợ gì cho bạn?',
      senderId: 0,
      role: 'SYSTEM',
      createdAt: now,
    });

    await batch.commit();

    return {
      code: 0,
      message: 'SUCCESS',
      data: {
        id: convoRef.id,
      },
    };
  }

  async claimConversation(conversationId: string, staffId: number) {
    const convoRef = this.db.collection('conversations').doc(conversationId);

    try {
      await this.db.runTransaction(async (tx) => {
        const doc = await tx.get(convoRef);

        if (!doc.exists) {
          throw new Error('Conversation not found');
        }

        const data: any = doc.data();

        if (data.assignedTo) {
          throw new Error('Already assigned');
        }

        tx.update(convoRef, {
          assignedTo: staffId,
          status: 'IN_PROGRESS',
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      });

      return {
        code: 0,
        message: 'SUCCESS',
      };
    } catch (err) {
      return {
        code: -1,
        message: err.message,
      };
    }
  }

  async updateLastMessage(
    conversationId: string,
    content: string,
    senderId: number,
  ) {
    const convoRef = this.db.collection('conversations').doc(conversationId);

    await convoRef.update({
      lastMessage: content,
      lastSenderId: senderId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const receiverIds = (
      await this.getReceivers(conversationId, senderId)
    ).filter((id) => id !== senderId);

    if (!receiverIds.length) return;

    await this.notificationsService.emit(NotificationEvent.CHAT_MESSAGE, {
      conversationId,
      senderId,
      content,
      receiverIds,
    });

    return {
      code: 0,
      message: 'SUCCESS',
    };
  }

  async getConversation(conversationId: string) {
    const doc = await this.db
      .collection('conversations')
      .doc(conversationId)
      .get();

    if (!doc.exists) return null;

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async getReceivers(conversationId: string, senderId: number) {
    const convo: any = await this.getConversation(conversationId);

    if (!convo) return [];

    const { userId, assignedTo } = convo;

    // =========================
    // USER gửi
    // =========================
    if (senderId === userId) {
      const adminIds = await this.getAllAdminIds();

      // đã assign → chỉ staff đó + admin
      if (assignedTo) {
        return [assignedTo, ...adminIds];
      }

      // chưa assign → tất cả staff + admin
      const staffIds = await this.getAllStaffIds();
      return [...staffIds, ...adminIds];
    }

    // =========================
    // STAFF / ADMIN gửi
    // =========================
    return [userId];
  }

  async getAllStaffIds(): Promise<number[]> {
    const staffs = await this.prisma.user.findMany({
      where: {
        role: 'STAFF',
        status: 'ACTIVE',
      },
      select: {
        id: true,
      },
    });

    return staffs.map((s) => s.id);
  }

  async getAllAdminIds(): Promise<number[]> {
    const admins = await this.prisma.user.findMany({
      where: {
        role: 'ADMIN',
        status: 'ACTIVE',
      },
      select: { id: true },
    });

    return admins.map((a) => a.id);
  }
}
