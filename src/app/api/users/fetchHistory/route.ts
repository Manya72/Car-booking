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
    console.log("data .username",data.username)
   const username=data.username
    const userHistory=await History.find({UserName:username})
    console.log("history",userHistory)
    return NextResponse.json(userHistory)
  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}

export  async function POST(request:NextRequest,response:NextResponse) { 
  try {
    const reqbody=await request.json()
    console.log("this is reqbody from the post request of the fetchhistory",reqbody
    )
    const token=request.cookies.get('token')?.value|| ''
    const data=jwt.verify(token,process.env.TOKEN_SECRET!)
    const newhistory=new History({
    UserName:data.username,
    carShopOwner:reqbody.carShopOwner,
    date:reqbody.date,
    startTime:reqbody.startTime,
    location:reqbody.location,                                  
    endTime:reqbody.endTime,



   })
   const SavedHistory=await newhistory.save()
   return NextResponse.json({message:"Saved Successfully",SavedHistory})

  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}
 

