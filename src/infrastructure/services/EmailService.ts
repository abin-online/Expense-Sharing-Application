import nodemailer, { Transporter } from 'nodemailer';
import { IEmailService } from '../../domain/IServices/IEmailService';

export class EmailService implements IEmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendGroupInvite(email: string, inviteToken: string, groupName: string): Promise<boolean> {
        const inviteLink = `${process.env.FRONTEND_URL}/groups/invite/${inviteToken}`;

        const mailOptions = {
            from: `"GroupApp" <${process.env.SMTP_USER || 'noreply@groupapp.com'}>`,
            to: email,
            subject: `You're invited to join the group "${groupName}"!`,
            text: `You have been invited to join the group "${groupName}". Click this link to accept the invite:\n\n${inviteLink}\n\nIf you didn't expect this, just ignore this email.`,
            html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>You're invited to join the group: <strong>${groupName}</strong></h2>
        <p>Click the button below to accept your invite:</p>
        <a href="${inviteLink}" style="display: inline-block; padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Accept Invite
        </a>
        <p>If the button doesn’t work, copy and paste this link into your browser:</p>
        <p>${inviteLink}</p>
        <p>If you didn’t expect this invitation, feel free to ignore this email.</p>
        <p>Cheers,<br/>GroupApp Team</p>
      </div>
    `
        };

        return this.sendMail(mailOptions, 'Group Invite');
    }
    private async sendMail(mailOptions: any, type: string): Promise<boolean> {
        try {
            const info = await this.transporter.sendMail(mailOptions);

            //   if (process.env.NODE_ENV !== 'production') {
            //     console.log(`[${type}] Email preview URL:`, nodemailer.getTestMessageUrl(info));
            //   }

            return true;
        } catch (error) {
            console.error(`Error sending ${type} email:`, error);
            return false;
        }
    }
}
