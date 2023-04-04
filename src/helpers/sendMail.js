const sendMail = async (body) => {
  try {
    const response = await fetch(`/api/email`, {
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (response) return response.json();
  } catch (error) {
    console.error(error);
  }
};

export default sendMail;
