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
}
