const { Resend } = require('resend');
const { resend: resendConfig } = require('../../config');

const resend = new Resend(resendConfig.apiKey);

module.exports = {
  send: async (to, templateName, data) => {
    console.log('Intentando enviar email a:', to);
    const template = require(`./templates/${templateName}`);
    const { subject, html } = template(data);
    const { data: info, error } = await resend.emails.send({
      from: resendConfig.from,
      to,
      subject,
      html,
    });
    if (error) throw new Error(`Resend error: ${error.message}`);
    console.log('Email enviado:', info.id);
  },
};
