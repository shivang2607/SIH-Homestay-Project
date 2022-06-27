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
        // user: "gaurakshat1008@gmail.com",
        // pass: "xsmtpsib-fc574882032725c333aa955f80e53572212c153afdbc72b8149424b8f68bdbe3-yI0CNbQdXrc89BqP",
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
