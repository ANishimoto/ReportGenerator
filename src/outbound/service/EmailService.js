import nodemailer from 'nodemailer';
import { promisify } from 'util';

export default class EmailService {
    async sendEmail(email) {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: process.env.SMTP_SECURE,
                service: process.env.SMTP_SERVICE,
                auth: {
                    user: process.env.SMTP_AUTH_USER,
                    pass: process.env.SMTP_
                },
                tls: {
                    rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED
                }
            });

            const promisedSendMail = promisify(transporter.sendMail);

            await promisedSendMail(email);
        } catch (error) {
            
        }
    }
    
}