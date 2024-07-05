import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connect()
export async function GET(request:NextRequest,response:NextResponse){
    try {
        const token=request.cookies.get('token')?.value|| ''
        const data=jwt.verify(token,process.env.TOKEN_SECRET!)
        const email=data.email
        const userdata=await User.findOne({email})
        console.log("this is user data",userdata)
        return NextResponse.json({success:true,data:userdata})
    } catch (error) {
        console.log("error",error)
        return NextResponse.json({error:error})
    }
}