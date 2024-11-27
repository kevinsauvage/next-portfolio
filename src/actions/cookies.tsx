'use server';
import { cookies } from 'next/headers';

export const setServerCookie = (name: string, value: string, options: { maxAge: number }) => {
  const cookieStore = cookies();

  try {
    cookieStore.set(name, value, options);
  } catch (error) {
    console.error(error);
  }
};
