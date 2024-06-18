import { NextRequest,NextResponse} from "next/server"
import { connect } from '@/dbconfig/dbconfig';
import History from '@/models/ServiceHistory';
import jwt from 'jsonwebtoken'
import { hash } from "crypto";
import HistoryA from '@/models/ServiceAvailability'
import deletedService from '@/models/DeletedService'
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
export async function PATCH(request:NextRequest,response:NextResponse){
  try {
    const reqbody=await request.json()
    const { _id, status } = reqbody;
   
    const user = await History.findByIdAndUpdate(_id, { status:"Done" });
    console.log("request body for the patch request",user)
    if (!user) {
      return NextResponse.json({message:"user not found"})
    }
   return NextResponse.json({message:"successfully updated"})
  } catch (error:any) {
    return  NextResponse.json({ error: error })
  }
}
export async function POST(request:NextRequest,response:NextResponse){
  try {
    
    const reqbody=await request.json()
    const { id } = reqbody;
    if(id){
      const user = await History.find({_id:id});
    console.log("this is the response from the post fetchorders",id)
   
    const historyAData = {
      location: user[0].location,
      carShopOwner: user[0].carShopOwner,
      date: user[0].date,
      startTime: user[0].startTime,
      endTime: user[0].endTime,
    };
    const deleteddata = {
      location: user[0].location,
      carShopOwner: user[0].carShopOwner,
      date: user[0].date,
      startTime: user[0].startTime,
      endTime: user[0].endTime,
      UserName:user[0].UserName
    };
    const newHistoryA = new HistoryA(historyAData);
    await newHistoryA.save();
    const newdeleteddata=new deletedService(deleteddata)
    await newdeleteddata.save()
     await History.findByIdAndDelete({_id:id});
    console.log('User added to HistoryA:', newHistoryA);
    }

   return NextResponse.json({message:"successfully updated"})
  } catch (error:any) {
    return  NextResponse.json({ error: error })
  }
}
