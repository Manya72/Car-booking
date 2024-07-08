import { NextRequest,NextResponse} from "next/server"
import { connect } from '@/dbconfig/dbconfig';
import History from '@/models/ServiceHistory';
import jwt from 'jsonwebtoken'
import { hash } from "crypto";
import User from "@/models/userModel";
import { sendnotification } from "@/app/lib/notify";
connect()

export  async function GET(request:NextRequest,response:NextResponse) { //for the user dashboard
  try {
    const token=request.cookies.get('token')?.value|| ''
    const data=jwt.verify(token,process.env.TOKEN_SECRET!)
  
    const username=data.username
   
    if(data.userType==='user'){
      const userHistory=await History.find({UserName:username })
      return NextResponse.json(userHistory)
    }
    else{
      const userHistory=await History.find({carShopOwner:username })
      return NextResponse.json(userHistory)
    }
  
    
  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}

export  async function POST(request:NextRequest,response:NextResponse) { 
  try {
    const reqbody=await request.json()
   const userdata=await User.findOne({username:reqbody.carShopOwner})
    const token=request.cookies.get('token')?.value|| ''
    const data=jwt.verify(token,process.env.TOKEN_SECRET!)
    const customerdata = await User.findOne({username: data.username})
   

      const res=await sendnotification(data.email,"You have succesfully booked Slot",data.username,reqbody)

      const res2=await sendnotification(userdata.email,"Your slot has been booked successfully by",data.username,reqbody)

    
    
    

    const newhistory=new History({
    UserName:data.username,
    carShopOwner:reqbody.carShopOwner,
    date:reqbody.date,
    startTime:reqbody.startTime,
    location:reqbody.location,                                  
    endTime:reqbody.endTime,
    ContactUser:customerdata.Contact,


   })
   console.log('iwoifgwoeihfihwopghpwigheirhg', customerdata.Contact)
   const SavedHistory=await newhistory.save()
   return NextResponse.json({message:"Saved Successfully",SavedHistory})

  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}
 

