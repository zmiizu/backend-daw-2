const nodemailer = require('nodemailer');
const { smtp } = require('../../config');

const transporter = nodemailer.createTransport({
  host: smtp.host,
  port: smtp.port,
  secure: smtp.port === 465,
  auth: { user: smtp.user, pass: smtp.pass },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

module.exports = {
  send: async (to, templateName, data) => {
    console.log('Intentando enviar email a:', to);
    const template = require(`./templates/${templateName}`);
    const { subject, html } = template(data);
    const info = await transporter.sendMail({ from: smtp.from, to, subject, html });
    console.log('Email enviado:', info.messageId);
  },
};
