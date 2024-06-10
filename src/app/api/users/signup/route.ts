import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
import { registerSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
connect()

export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json()
        console.log("this is reqbody",reqBody)
     
        const {email,password,username,userType}=reqBody
        console.log("this is usertype",userType)
        const user1 =await User.findOne({username})
        console.log("this is")
        if(user1){
            console.log("this is response for validating")
            return NextResponse.json({message:"Change the username",status:400})
        }
        const user =await User.findOne({email})
        if(user){
          console.log("this is response for validating")
          return NextResponse.json({message:"Email already exists",status:400})
      }
        vine.errorReporter = () => new ErrorReporter();
        const validator = vine.compile(registerSchema);
        const output = await validator.validate(reqBody);
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
    catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
          return NextResponse.json(
            { status: 400, errors: error.messages },
            
          );
        }
}}
