import nodemailer from 'nodemailer';

const { NODEMAILER_PW, NODEMAILER_EMAIL } = process.env;

const handler = async (request, response) => {
  const requestMethod = request.method;

  if (requestMethod !== 'POST') {
    return;
  }

  const { subject, message, name, email, phone } = request.body;

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
    subject: `Sender email: ${email}, Subject: ${subject}, Phone: ${phone}`,
    text: message,
    to: 'kevinsauvage@outlook.com',
  };

  const transporter = nodemailer.createTransport({
    auth: {
      pass: NODEMAILER_PW,
      user: NODEMAILER_EMAIL,
    },
    service: 'gmail',
  });

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        response.status(404).json({
          error: `Connection refused at ${error.address}`,
          ok: false,
        });
      } else {
        response.status(250).json({
          ok: true,
          success: `Message delivered to ${info.accepted}`,
        });
      }
    });
  } catch (error) {
    return response.status(500).json({ error: error.message || error.toString() });
  }
};

export default handler;
