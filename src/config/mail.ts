import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  // helps identify auth issues faster on deployed environments
  logger: false,
  debug: false,
});


export default transporter;