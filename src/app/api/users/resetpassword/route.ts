import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";

import { connect } from "@/dbconfig/dbconfig";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();

        // TODO: You have to add validation here to check both passwords are same
      
        // * Decrypt string
        const crypter = new Cryptr(process.env.NEXTAUTH_SECRET || "");
        const email = crypter.decrypt(payload.email);
      console.log("email---------------------",payload.signature)
        const user = await User.findOne({
          email: email,
          password_reset_token: payload.signature,
        });
        console.log("userhfvb fbs=-------------",user)
        if (user == null || user == undefined) {
          return NextResponse.json({
            status: 400,
            message: "Reset url is not correct. pls double check it .",
          });
        }
      
        const salt=await bcrypt.genSalt(10)
        user.password =await bcrypt.hash(payload.password, salt);
        user.password_reset_token = null;
        await user.save();
      
        return NextResponse.json({
          status: 200,
          message: "Password changed successfully. please login with new password.",
        });
    } catch (error) {
        return NextResponse.json({message:error})
    }
 
}