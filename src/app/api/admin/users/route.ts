import {connect} from "@/dbconfig/dbconfig"

import { NextRequest,NextResponse} from "next/server"
import User from "@/models/userModel";
import jwt from 'jsonwebtoken';
import { messages } from "@vinejs/vine/defaults";

connect()

export async function GET(request:NextRequest){
   try {
      const body=request.json();
      const userdata=await User.find();
  
      return NextResponse.json({
        data:userdata,
        message:"datafetched"
      })
   } catch (error) {
    return NextResponse.json({error:"error "})
   }
} 