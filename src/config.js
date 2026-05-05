
require('dotenv').config();

if (!process.env.JWT_ACCESS_SECRET) throw new Error('Falta JWT_ACCESS_SECRET en .env');

module.exports = {
  port:         Number(process.env.PORT) || 3000,
  appUrl:       process.env.APP_URL || 'http://localhost:3000',
  jwtSecret:    process.env.JWT_ACCESS_SECRET,
  resend: {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.EMAIL_FROM,
  },
};
