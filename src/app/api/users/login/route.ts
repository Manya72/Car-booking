import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse, userAgent} from "next/server"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        console.log("this is reqbody",reqBody)
        const {email,password}=reqBody
        const user =await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not  exists"},{status:400})
        }
        console.log("user data,",user)
        const validpassword=await bcryptjs.compare(password,user.password)

        if(!validpassword){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }

        const tokendata={
            id:user._id,
            username:user.username,
            email:user.email,
        }
        const token=await jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:"30d"})

        const response =NextResponse.json({
            message:"Login Successful",
            success:true,
            data:user
            
           
        },user)

        response.cookies.set("token",token,{
            httpOnly:true,
        })
        console.log("this is the response from router.ys",response)
        return response;


    } catch (error:any) {
        console.log("Error occured111:",error)
        return NextResponse.json({error:error.message},{status:500})
        
    }
} 

// 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTg3ZGQ4MzRmMmM2NzJmODUxZTUz
//MiIsInVzZXJuYW1lIjoibWFueWEiLCJlbWFpbCI6Im1hbnlhIiwiaWF0IjoxNzE3MTM2MDE2LCJleHAiOjE3MT
//k3MjgwMTZ9.hIb0yYU6e34H6Wkr_GRKI1O7INQOfS2M1IaFbg0EuBw
// 