'use server';

import emailjs from '@emailjs/nodejs';

const serviceId = process.env.email_js_service_id as string;
const publicKey = process.env.email_js_public_key as string;
const privateKey = process.env.email_js_provate_key as string;
const templateId = process.env.email_js_template_id as string;

const keyParameters = {
  privateKey,
  publicKey,
};

export async function sendMail(previousState: FormData, formData: FormData) {
  const templateParameters = {
    email: formData.get('email') as string,
    fullName: formData.get('fullName') as string,
    message: formData.get('message') as string,
    phone: formData.get('phone') as string,
    subject: formData.get('subject') as string,
  };

  const missingValues = [];

  if (!templateParameters.email) missingValues.push('email');
  if (!templateParameters.fullName) missingValues.push('fullName');
  if (!templateParameters.message) missingValues.push('message');

  if (missingValues.length > 0) {
    const missingFieldMessage =
      missingValues.length === 1
        ? `Oops! It looks like you forgot to fill in the <strong>"${missingValues[0]}"</strong> field. Could you please provide the necessary information?`
        : `Oops! It looks like you missed filling out some important fields:  <strong>${missingValues.join(
            ', ',
          )}</strong>. Could you please complete them?`;

    return { error: true, message: missingFieldMessage };
  }
  if (templateParameters.message?.length > 0 && templateParameters?.message?.length < 100) {
    return {
      error: true,
      message: `Almost there! Your message could use a little more detail. We suggest a minimum of 100 characters. Currently, your message contains ${templateParameters.message?.length} characters.`,
    };
  }

  try {
    await emailjs.send(serviceId, templateId, templateParameters, keyParameters);

    return {
      message: 'Your message has been sent successfully!',
      success: true,
    };
  } catch (error) {
    console.error('FAILED...', error);

    return {
      error: true,
      message: 'Something went wrong. Please try again later.',
    };
  }
}
