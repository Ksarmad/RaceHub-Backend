import transporter from "../../config/mail";

interface UserMailData {
  name: string;
  email: string;
}

interface AdminMailData {
  name: string;
  phone: string;
}

export class MailService {
  // Email to User
  static async sendRegistrationSuccessEmail(
    data: UserMailData
  ) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: data.email,

      subject: "Game Registration Successful",

      html: `
        <div style="font-family:sans-serif;">
          <h2>Registration Successful</h2>

          <p>Hello ${data.name},</p>

          <p>
            Thank you for registering for the game event.
          </p>

          <p>
            You will receive your timeslot soon.
          </p>
        </div>
      `,
    });
  }

  // Email to Admin
  static async sendAdminNotificationEmail(
    data: AdminMailData
  ) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: process.env.ADMIN_EMAIL,

      subject: "New Player Registration",

      html: `
        <div style="font-family:sans-serif;">
          <h2>New Registration</h2>

          <p>
            A new player has registered.
          </p>

          <p>
            <strong>Name:</strong> ${data.name}
          </p>

          <p>
            <strong>Phone:</strong> ${data.phone}
          </p>

          <p>
            Please assign an available timeslot.
          </p>
        </div>
      `,
    });
  }
}