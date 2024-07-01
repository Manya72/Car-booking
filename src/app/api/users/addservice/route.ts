import { NextRequest,NextResponse} from "next/server" //for adding service from the shopowner 
import service from '../../../../models/ServiceAvailability'
import { connect } from '@/dbconfig/dbconfig';
import Service from '@/models/ServiceAvailability';
import User from "@/models/userModel";
connect()
import jwt from 'jsonwebtoken'
export  async function POST(request:NextRequest,response:NextResponse) { 
  try {
    const reqBody=await request.json()
  
    const token=request.cookies.get('token')?.value|| ''
    const data=jwt.verify(token,process.env.TOKEN_SECRET!)
   
    const newservice=new service(
      {
        location:reqBody.location,
        startTime:reqBody.startTime,
        endTime:reqBody.endTime,
        date:reqBody.date,
        carShopOwner:data.username,
        email:data.email

      }
    )
 
        const savedService=await newservice.save()
        return NextResponse.json({message:"Service created successfully",success:true,savedService})


   
  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}
export async function GET(request:NextRequest,response: NextResponse) {
  try {
    // Get current date
    const currentDate = new Date();
    
    const token=request.cookies.get('token')?.value|| ''
    const data=jwt.verify(token,process.env.TOKEN_SECRET!)
    // Find services that have a date greater than or equal to the current date
    console.log("data ",data)
    if(data.userType==='user'){
      const services = await Service.find({});
      return NextResponse.json(services);
    }
    else{
      const services = await Service.find({carShopOwner:data.username});
      return NextResponse.json(services);
    }
   
    // Return the filtered services
 
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

 

export async function PATCH(request:NextRequest,response:NextResponse){
  try {
    const reqbody=await request.json()
   
    const deleteh=await Service.findOneAndDelete({_id:reqbody._id})
    return NextResponse.json({})

  } catch (error) {
    return NextResponse.json({message:error})
    
  }

}