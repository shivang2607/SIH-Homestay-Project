import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "botfakeq@gmail.com",
    pass: "qwertypassword!",
  },
});
export const message = {
  from: "from@email.com",
  to: "receiver_email@gmail.com",
  subject: "Subject",
  html: "<h1>Hello SMTP Email</h1>",
};