import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import cryptoRandomString from "crypto-random-string"
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'
import Cryptr from "cryptr";
import { sendResetLink } from "@/app/lib/mail"

connect()
export async function POST(request:NextRequest,response:NextResponse){
    try {
        const {email}=await request.json()
      
        const user=await User.findOne({email:email})
        console.log("email",user)

        if(!user){
            console.log("user from the route ts",user)
            return NextResponse.json({message:"User does not  exists.",status:400})  
        }
        const randomStr = cryptoRandomString({
            length: 64,
            type: "alphanumeric",
          });
        
          user.password_reset_token = randomStr;
          await user.save();
   
          const crypt = new Cryptr(process.env.NEXTAUTH_SECRET || "");
          const encryptedEmail = crypt.encrypt(user.email);
        const url = `${process.env.NEXTAUTH_URL}/reset-password/${encryptedEmail}?signature=${randomStr}`;
        try {
            await sendResetLink(email, url);
            return NextResponse.json({
              status: 200,
              message: "Email sent successfully.please check your email.",
            });
            
        } catch (error) {
            
        }
        return NextResponse.json({success:true})
    } catch (error) {
        console.log("error",error)
        return NextResponse.json({error:error})
    }
}
