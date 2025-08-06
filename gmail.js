import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { customAlphabet } from "nanoid";

dotenv.config({ path: "config.env" });

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 6);
const resetCode = nanoid();

if (!process.env.GMAIL_USER2 || !process.env.GMAIL_PASS2) {
  console.error("Erro: Variáveis GMAIL_USER2 e/ou GMAIL_PASS2 não estão definidas no arquivo config.env");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER2,
    pass: process.env.GMAIL_PASS2,
  },
});

const emailTo = "xxhozemathxx2612@gmail.com";

const mailOptions = {
  from: `Pizza Stars <${process.env.GMAIL_USER2}>`,
  to: emailTo,
  subject: "Password code for Pizza Stars",
  text: `Your code is ${resetCode}`,
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #ff6b35;
          color: white;
          padding: 30px;
          text-align: center;
        }
        .content {
          padding: 40px 30px;
          text-align: center;
        }
        .code {
          background-color: #f8f9fa;
          border: 2px dashed #dee2e6;
          border-radius: 6px;
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 4px;
          padding: 20px;
          margin: 30px 0;
          color: #495057;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #6c757d;
        }
        .warning {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 4px;
          padding: 15px;
          margin: 20px 0;
          color: #856404;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍕 Pizza Stars</h1>
          <p>Password Reset Request</p>
        </div>
        <div class="content">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password. Use the code below to proceed:</p>
          <div class="code">${resetCode}</div>
          <div class="warning">⚠️ This code will expire in 15 minutes for security reasons.</div>
          <p>If you didn't request this password reset, please ignore this email or contact our support team.</p>
        </div>
        <div class="footer">
          <p>© 2025 Pizza Stars. All rights reserved.</p>
          <p>This is an automated message, please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `,
};

try {
  const result = await transporter.sendMail(mailOptions);
  console.log("Email enviado com sucesso:", result);
} catch (err) {
  console.error("Erro ao enviar o e-mail:", err);
}