import nodemailer from 'nodemailer';

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

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

    const transporter = nodemailer.createTransport({
      auth: { pass: EMAIL_PASSWORD, user: EMAIL_ADDRESS },
      service: 'gmail',
    });

    const mailOptions = {
      from: { address: email, name },
      subject: `Sender email: ${email}, Subject: ${subject}`,
      text: message,
      to: 'kevinsauvage@outlook.com',
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      return response.status(500).json({ error: error.message || error.toString() });
    }
    return response.status(200).json({ ok: true });
  }
  response.status(500).json({ message: 'Method not allowed' });
};

export default handler;
