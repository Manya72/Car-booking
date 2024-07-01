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

export async function sendnotification(email: string, msg: String,username:String,data:any) {

  await transporter.sendMail({
    from: '"manyaahir6676@gmail.com',
    to: email,
    subject: 'Update from the Car-wash',
    text: `Notification for you: ${msg}`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .header {
            background: #007bff;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            padding: 20px;
          }
          .details {
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 20px;
          }
          .details p {
            margin: 5px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Notification from the Car-wash</h2>
          </div>
          <div class="content">
            <p> ${msg} : ${username}</p>
            <div class="details">
              <p><strong>Details about the booking:</strong></p>
              <p><strong>Location:</strong> ${data.location}</p>
              <p><strong>Car Shop Owner:</strong> ${data.carShopOwner}</p>
              <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
              <p><strong>Start Time:</strong> ${data.startTime}</p>
              <p><strong>End Time:</strong> ${data.endTime}</p>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent automatically. Please do not reply.</p>
          </div>
        </div>
      </body>
    </html>
  `,
  });
  return NextResponse.json({message:"User created successfully from send email"})
}
export async function notifyDeletion(email: string, carShopOwner: string, data: any, reason: string) {
  console.log("heya from the deleteion part",email)
  await transporter.sendMail({
   
    from: '"manyaahir6676@gmail.com',
    to: email,
    subject: 'Service Deletion Notification',
    text: `Your service has been deleted by ${carShopOwner} due to the following reason: ${reason}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p><strong>Dear User,</strong></p>
        <p>Your service has been deleted by <strong>${carShopOwner}</strong> due to the following reason:</p>
        <p style="color: red;"><strong>${reason}</strong></p>
        <p>Details about the booking:</p>
        <ul>
          <li><strong>Location:</strong> ${data[0].location}</li>
          <li><strong>Date:</strong> ${new Date(data[0].date).toLocaleDateString()}</li>
          <li><strong>Start Time:</strong> ${data[0].startTime}</li>
          <li><strong>End Time:</strong> ${data[0].endTime}</li>
        </ul>
        <br/>
        <p>Thank you for using our service.</p>
        <p><strong>Car Wash Team</strong></p>
      </div>
    `,
  });
  return NextResponse.json({ message: "Notification sent successfully" });
}