import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from "@/app/lib/mail";
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody
        const user =await User.findOne({email})
        console.log("user from the route ts",user)
        if(!user){
            console.log("user from the route ts",user)
            return NextResponse.json({error:"User does not  exists.",status:400})
        }
        if(!user.isVerified){
            const otp = Math.floor(100000 + Math.random() * 900000);
            user.otp=otp;   
            user.save();
            sendVerificationEmail(email,otp)
            return NextResponse.json({error:"User is not verified",status:400})
        }
        const validpassword=await bcryptjs.compare(password,user.password)
        
        if(!validpassword){
            return NextResponse.json({error:"Invalid password",status:400})
        }
       

        const tokendata={
            id:user._id,
            username:user.username,
            email:user.email,
            userType:user.userType

        }
        const token=await jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:"30d"})

        const response =NextResponse.json({
            message:"Login Successful",
            success:true,
            data:user,
     
            status:200
            
           
        },user)

        response.cookies.set("token",token,{
            httpOnly:true,
        })
        console.log("this is the response from router.ys",response)
        return response;


    } catch (error:any) {
        console.log("Error occured111:",error)
        return NextResponse.json({ status: 400,error:error.message})
        
    }
} 