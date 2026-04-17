import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';
import type { Message } from 'firebase-admin/messaging';

@Injectable()
export class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
    });
  }

  async sendNotification(token: string, title: string, body: string) {
    return admin.messaging().send({
      token,
      notification: {
        title,
        body,
      },
      android: {
        priority: 'high',
        notification: {
          channelId: 'default',
          priority: 'high',
        },
      },
    });
  }

  async sendMulticast(
    tokens: string[],
    title: string,
    body: string,
    data?: Record<string, any>,
  ) {
    if (!tokens.length) return;

    return admin.messaging().sendEachForMulticast({
      tokens,
      notification: { title, body },
      data: this.convertDataToString(data),
      android: {
        priority: 'high',
        notification: {
          channelId: 'default',
          priority: 'high',
        },
      },
    });
  }

  async sendTestNotification(token: string) {
    const message: Message = {
      token,
      notification: {
        title: 'Test Notification',
        body: 'Hello from NestJS 🚀',
      },
      android: {
        priority: 'high',
        notification: {
          channelId: 'default',
          priority: 'high',
        },
      },
    };

    return admin.messaging().send(message);
  }

  private convertDataToString(data?: Record<string, any>) {
    if (!data) return {};

    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, String(value)]),
    );
  }
}
