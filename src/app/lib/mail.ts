// import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({

    service: 'gmail',
  auth: {
    user: "manyaahir6676@gmail.com",
    pass: process.env.PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, otp: number) {
    console.log("this is from the sendverificationemai")
//   const verificationUrl = `http://localhost:3000/activate/${otp}`; // Nowy format URL
  await transporter.sendMail({
    from: '"manyaahir6676@gmail.com',
    to: email,
    subject: 'Email Verification OTP',
    text: `Your OTP for email verification is: ${otp}`,
    html: `<strong>Your OTP for email verification is: ${otp}</strong>`,
  });
  return NextResponse.json({message:"User created successfully from send email"})
}