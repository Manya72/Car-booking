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
export async function sendResetLink(email: string,url:string) {
  console.log("this is from the sendverificationemai")
//   const verificationUrl = `http://localhost:3000/activate/${otp}`; // Nowy format URL
await transporter.sendMail({
  from: '"manyaahir6676@gmail.com',
  to: email,
  subject: 'Reset Password',
  text: ``,
  html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">Reset Your Password</h2>
                <p>You requested to reset your password. Please click the button below to reset it.</p>
                <a href="${url}" style="display: inline-block; padding: 10px 20px; margin-top: 10px; margin-bottom: 10px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
              
            </div>
        `,
});
return NextResponse.json({message:"User created successfully from send email"})
}