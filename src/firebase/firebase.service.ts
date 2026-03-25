import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

@Injectable()
export class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as any),
    });

    console.log('Firebase initialized');
  }

  async sendTestNotification(token: string) {
    const message = {
      token,
      notification: {
        title: 'Test Notification',
        body: 'Hello from NestJS 🚀',
      },
    };

    return admin.messaging().send(message);
  }
}
