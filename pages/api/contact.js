import nodemailer from "nodemailer";
require("dotenv").config();
export default async function contact(req, res) {
  try{
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: process.env.SENDINBLUE_ID,
        pass: process.env.SENDINBLUE_PASS,
      },
    })
    let mailStatus = await transporter.sendMail({
      from: `${req.body.fromName} <${req.body.fromEmail}>`,
      to: req.body.toEmail,
      subject: req.body.subject,
      html: req.body.html,
    })
    console.log(`Message sent: ${mailStatus.messageId}`);
    return `Message sent: ${mailStatus.messageId}`;
  } catch(error){
    console.error(error);
    throw new Error(
      `Something went wrong in the sendmail method. Error: ${error.message}`
    );
  }
}
