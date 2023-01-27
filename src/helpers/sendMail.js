export const sendMail = async (body) => {
  try {
    const response = await fetch(`/api/email`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response) return response.json();
  } catch (error) {
    console.log(error);
  }
};
