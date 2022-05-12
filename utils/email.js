"use strict";
require('dotenv').config();
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail")
const PORT =  process.env.PORT || 3000


async function sendEmail(data) {

  sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

  const msg = {
    to: data.to,
    from: process.env.MAIL_FROM_ADDRESS,
    subject: data.subject,
    template_id: data.template_id,
    dynamic_template_data: data.dynamic_template_data
  }

  try {
    await sgMail.send(msg)
  } catch(err) {
    console.error("Error sendGrid: ",err)
  }
}

async function main() {

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,// smtp.gmail.com
    port: process.env.MAIL_PORT, // 465
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS, // sender address
    to: "juan@example.com, daniel@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `
    <style>
      .title {
      color: pink;
      }
    </style>
    <b class="title">Hello world?</b>
    <b>Aqui se encuentra la info</b>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// sendEmail().catch(console.error);
module.exports = {
  sendEmail
}
