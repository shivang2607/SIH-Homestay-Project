import nodemailer from "nodemailer";

export default async function sendMail(req, res) {
  var mailConfig;
  if (process.env.NODE_ENV !== "development") {
    mailConfig = {
      pool: true,
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587, // port for secure SMTP
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: "grahashram@outlook.com",
        pass: "weAreTeamDjsa@SIH",
      },
    };
  } else {
    mailConfig = {
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "deven.shanahan64@ethereal.email",
        pass: "UA8WgBVZMeCzDvAyGG",
      },
    };
  }
  let transporter = nodemailer.createTransport(mailConfig);

  const mailData = {
    // from: `"${req.body.fromName} 🏡" <${req.body.fromEmail}>`,
    from: `grahashram@outlook.com`,
    to: req.body.toEmail,
    subject: req.body.subject,
    html: req.body.html,
  };
  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else {
      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ message: "Message sent" });
    }
  });
}
