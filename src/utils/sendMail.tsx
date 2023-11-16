type Body = {
  fullName: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
};

const sendMail = async (body: Body) => {
  const response = await fetch(`/api/send-mail`, {
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (response) return response.json();
  throw new Error('Could not send mail');
};

export default sendMail;
