import { NextRequest,NextResponse} from "next/server"
import { connect } from '@/dbconfig/dbconfig';
import History from '@/models/ServiceHistory';
import jwt from 'jsonwebtoken'
import { hash } from "crypto";
connect()

export  async function GET(request:NextRequest,response:NextResponse) { //for the user dashboard
  try {
    const token=request.cookies.get('token')?.value|| ''
    const data=jwt.verify(token,process.env.TOKEN_SECRET!)
    
   const username=data.username
    const userHistory=await History.find({})

   //got the username from the token and using that fetched from te DB
    const userHistory1=await History.find({carShopOwner:username})
   
    return NextResponse.json(userHistory1)
  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}
