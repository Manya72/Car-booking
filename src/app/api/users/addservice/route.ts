import { NextRequest,NextResponse} from "next/server" //for adding service from the shopowner 
import service from '../../../../models/ServiceAvailability'
import { connect } from '@/dbconfig/dbconfig';
import Service from '@/models/ServiceAvailability';
connect()
import jwt from 'jsonwebtoken'
export  async function POST(request:NextRequest,response:NextResponse) { 
  try {
    const reqBody=await request.json()
  
    const token=request.cookies.get('token')?.value|| ''
    const data=jwt.verify(token,process.env.TOKEN_SECRET!)
    console.log("token data it is hhe",data.username)
    const newservice=new service(
      {
        location:reqBody.location,
        startTime:reqBody.startTime,
        endTime:reqBody.endTime,
        date:reqBody.date,
        carShopOwner:data.username

      }
    )
 
        const savedService=await newservice.save()
        return NextResponse.json({message:"Service created successfully",success:true,savedService})


   
  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}
export  async function GET(response:NextResponse) { //for the services details 
  try {
    const Services=await Service.find()
    return NextResponse.json(Services)
  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}
 

export async function PATCH(request:NextRequest,response:NextResponse){
  try {
    const reqbody=await request.json()
    console.log("reqbodyfrom path request",reqbody)
    console.log("req id",reqbody._id)
    const deleteh=await Service.findOneAndDelete({_id:reqbody._id})
    return NextResponse.json({})

  } catch (error) {
    return NextResponse.json({message:error})
    
  }

}