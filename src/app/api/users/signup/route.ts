import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
connect()

export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json()
        console.log("this is reqbody",reqBody)
        const {email,password,username,userType}=reqBody
        console.log("this is usertype",userType)
        const user =await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }
        //hash password
        const salt=await bcryptjs.genSalt(10)
        const hashPassword=await bcryptjs.hash(password,salt)

        const newUser= new User({
            username,
            email,
            password: hashPassword,
            userType,
        })
        console.log("new user")
        const savedUser=await newUser.save()
        return NextResponse.json({message:"User created successfully",success:true,savedUser})


    }
    catch (error:any){
        console.log("Error occured111:",error)
        return NextResponse.json({error:error.message},{status:500})
       

    }
}