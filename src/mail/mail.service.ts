import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_APP_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });
  }

  async sendOtp(email: string, otp: string) {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8" />
        <title>OTP Verification</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:0px 0; border-radius:12px">
            <tr>
            <td align="center">

                <!-- Card -->
                <table width="400" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; padding:30px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">

                <!-- Logo / Title -->
                <tr>
                    <td align="center" style="padding-bottom:20px;">
                    <h2 style="margin:0; color:#333;">Spa Booking</h2>
                    <p style="margin:5px 0 0; color:#888; font-size:14px;">
                        Password Reset
                    </p>
                    </td>
                </tr>

                <!-- Content -->
                <tr>
                    <td align="center" style="padding:20px 0;">
                    <p style="color:#555; font-size:16px; margin:0;">
                        Your OTP code is:
                    </p>

                    <!-- OTP BOX -->
                    <div style="
                        margin:20px 0;
                        font-size:32px;
                        letter-spacing:8px;
                        font-weight:bold;
                        color:#4A90E2;
                    ">
                        ${otp}
                    </div>

                    <p style="color:#999; font-size:14px;">
                        This code will expire in 5 minutes.
                    </p>
                    </td>
                </tr>

                <!-- Divider -->
                <tr>
                    <td style="border-top:1px solid #eee; padding-top:15px;">
                    <p style="color:#aaa; font-size:12px; text-align:center;">
                        If you didn’t request this, please ignore this email.
                    </p>
                    </td>
                </tr>

                </table>

            </td>
            </tr>
        </table>

        </body>
        </html>
        `;

    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Reset Password OTP',
      html: html,
    });
  }
}
