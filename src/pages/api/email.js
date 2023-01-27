import nodemailer from "nodemailer";

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const handler = async (req, res) => {
  const requestMethod = req.method;

  switch (requestMethod) {
    case "POST":
      const { subject, message, name, email } = req.body;

      if (!subject) {
        const error = new Error();
        error.message = "Missing subject";
        return res.status(401).send(error);
      }

      if (!message) {
        const error = new Error();
        error.message = "Missing message";
        return res.status(401).send(error);
      }

      if (!email) {
        const error = new Error();
        error.message = "Missing email";
        return res.status(401).send(error);
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: EMAIL_ADDRESS, pass: EMAIL_PASSWORD },
      });

      const mailOptions = {
        from: { name, address: email },
        to: "kevinsauvage@outlook.com",
        subject: `Sender email: ${email}, Subject: ${subject}`,
        text: message,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
      }
      return res.status(200).json({ ok: true });

    // handle other HTTP methods
    default:
      res.status(500).json({ message: "Method not allowed" });
  }
};

export default handler;
