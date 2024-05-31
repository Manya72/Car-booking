import { NextRequest,NextResponse} from "next/server" //for adding service from the shopowner 
import { connect } from '@/dbconfig/dbconfig';
import Service from '@/models/ServiceAvailability';
connect()
import jwt from 'jsonwebtoken'
export  async function POST(request:NextRequest,response:NextResponse) { 
  try {
    const reqBody=await request.json()
    console.log("reqbody is this ",reqBody)
    const token=request.cookies.get('token')?.value|| ''
    const data=jwt.verify(token,process.env.TOKEN_SECRET!)
    console.log("token data it is hhe",data)
    return NextResponse.json({message:"User created successfully",success:true,data:reqBody})
  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}
 

