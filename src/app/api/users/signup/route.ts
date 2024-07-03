import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
import { registerSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import ErrorReporter from "@/validator/ErrorReporter";
import { sendVerificationEmail } from "@/app/lib/mail";
import shopDetail from "@/models/shopdetails";
connect()

export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json()
     
        const {email,password,username,userType,ShopName,Address,Contact,OwnerId}=reqBody

        const user1 =await User.findOne({username})

        if(user1){
           
            return NextResponse.json({message:"Change the username",status:400})
        }
        const user =await User.findOne({email})
        if(user){
    
          return NextResponse.json({message:"Email already exists",status:400})
      }
        vine.errorReporter = () => new ErrorReporter();
        const validator = vine.compile(registerSchema);
        const output = await validator.validate(reqBody);
        //hash password
        const salt=await bcryptjs.genSalt(10)
        const hashPassword=await bcryptjs.hash(password,salt)
        const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
        console.log("new user")
        
        
        const response=await sendVerificationEmail(email,otp)
        
          const newUser= new User({
            username,
            email,
            otp:otp,
            password: hashPassword,
            userType,
        })
       

        
        if(userType==='carShopOwner'){
          const details= new shopDetail({
            email,
            Contact,
            Address,
            ShopName,
            // OwnerId,
            isApproved:false,
            username,
            slots:[{start:"",end:""}]
        })
        const savedUser=await details.save()

        }
        
        
        
        const savedUser=await newUser.save()
        return NextResponse.json({message:"User created successfully",success:true,savedUser})
      

    }
    catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
          return NextResponse.json(
            { status: 400, errors: error.messages },
            
          );
        }
        return NextResponse.json(
          { status: 400, errors:"error from signup" ,error},
          
        );
}}
