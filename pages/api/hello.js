// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

import nodemailer from "nodemailer";

export async function sendEmail(to, html) {

    // let testAccount = await nodemailer.createTestAccount();
    // console.log('testAccount:', testAccount);

    let transporter = nodemailer.createTransport({
    service:'Gmail', 
    auth: {
      user: 'botfakeq@gmail.com',
      
    }
  });

  
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', 
    to: to, 
    subject: "Change of Password",
    html
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}