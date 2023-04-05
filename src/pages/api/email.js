import nodemailer from 'nodemailer';

const { EMAIL_ADDRESS, EMAIL_PASSWORD, GMAIL_AUTH_ID, GMAIL_SECRET, GMAIL_REFRESH } = process.env;

const handler = async (request, response) => {
  const requestMethod = request.method;

  if (requestMethod === 'POST') {
    const { subject, message, name, email } = request.body;

    if (!subject) {
      const error = new Error('Missing subject');
      return response.status(401).send(error);
    }

    if (!message) {
      const error = new Error('Missing message');
      return response.status(401).send(error);
    }

    if (!email) {
      const error = new Error('Missing email');
      return response.status(401).send(error);
    }

    const mailOptions = {
      from: { address: email, name },
      subject: `Sender email: ${email}, Subject: ${subject}`,
      text: message,
      to: 'kevinsauvage@outlook.com',
    };

    const transporter = nodemailer.createTransport({
      auth: {
        clientId: GMAIL_AUTH_ID,
        clientSecret: GMAIL_SECRET,
        pass: EMAIL_PASSWORD,
        refreshToken: GMAIL_REFRESH,
        type: 'OAuth2',
        user: EMAIL_ADDRESS,
      },
      service: 'gmail',
    });

    try {
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return response.status(500).json({ error: error.message || error.toString() });
        }
        return response.status(200).json({ ok: true });
      });
    } catch (error) {
      return response.status(500).json({ error: error.message || error.toString() });
    }
    return response.status(200).json({ ok: true });
  }
  response.status(500).json({ message: 'Method not allowed' });
};

export default handler;
