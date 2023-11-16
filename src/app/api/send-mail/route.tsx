import { NextRequest, NextResponse } from 'next/server';

import nodemailer from 'nodemailer';

const { NODEMAILER_PW, NODEMAILER_EMAIL } = process.env;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { subject, message, name, email, phone } = body || {};

  if (!subject) {
    return NextResponse.json({ error: 'Missing subject' }, { status: 401 });
  }

  if (!message) {
    return NextResponse.json({ error: 'Missing message' }, { status: 401 });
  }

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 401 });
  }

  try {
    const mailOptions = {
      from: { address: email, name },
      subject: `Sender email: ${email}, Subject: ${subject}, Phone: ${phone}`,
      text: message,
      to: 'kevinsauvage@outlook.com',
    };

    const auth = {
      pass: NODEMAILER_PW,
      user: NODEMAILER_EMAIL,
    };

    const transporter = nodemailer.createTransport({
      auth,
      service: 'gmail',
    });

    const info = await transporter.sendMail(mailOptions);
    if (info?.accepted?.length) {
      return NextResponse.json(
        {
          ok: true,
          success: `Message delivered to ${info.accepted}`,
        },
        { status: 200 },
      );
    }
    return NextResponse.json(
      {
        error: `Connection refused`,
        ok: false,
      },
      { status: 404 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: (error as Error).message,
        ok: false,
      },
      { status: 500 },
    );
  }
}
