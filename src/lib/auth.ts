import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Blog App" <prismablog@gmail.com>',
          to: user.email,
          subject: "Verify your email",
          html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0">
          <table
            width="100%"
            max-width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
            "
          >
            <tr>
              <td
                style="
                  padding: 24px;
                  text-align: center;
                  background-color: #111827;
                  color: #ffffff;
                "
              >
                <h1 style="margin: 0; font-size: 22px">Blog App</h1>
              </td>
            </tr>

            <tr>
              <td style="padding: 32px">
                <h2 style="margin-top: 0; color: #111827">
                  Verify your email address
                </h2>
                <p style="color: #374151; font-size: 15px;>Hello ${user.name}</p>

                <p style="color: #374151; font-size: 15px; line-height: 1.6">
                  You created an account on Blog App. To complete your
                  registration, please verify your email address by clicking the
                  button below.
                </p>

                <div style="text-align: center; margin: 32px 0">
                  <a
                    href="${verificationUrl}"
                    target="_blank"
                    style="
                      background-color: #2563eb;
                      color: #ffffff;
                      text-decoration: none;
                      padding: 14px 28px;
                      border-radius: 6px;
                      font-weight: bold;
                      display: inline-block;
                    "
                  >
                    Verify Email
                  </a>
                </div>

                <p style="color: #6b7280; font-size: 14px">
                  This link will expire in 24 hours. If you did not create this
                  account, you can safely ignore this email.
                </p>

                <p
                  style="
                    color: #6b7280;
                    font-size: 14px;
                    word-break: break-all;
                  "
                >
                  If the button does not work, copy and paste this URL into your
                  browser:
                  <br />
                  <a
                    href="${verificationUrl}"
                    style="color: #2563eb"
                    >${verificationUrl}</a
                  >
                </p>
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 20px;
                  text-align: center;
                  background-color: #f9fafb;
                  color: #9ca3af;
                  font-size: 12px;
                "
              >
                © 2025 Blog App. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
        });

        console.log("Message sent:", info.messageId);
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
