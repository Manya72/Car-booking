import { NextRequest,NextResponse} from "next/server" 
import { connect } from '@/dbconfig/dbconfig';
import shopDetail from '../../../../models/shopdetails'
connect()
import jwt from 'jsonwebtoken'

export  async function POST(request:NextRequest,response:NextResponse) { 
  try {
    const reqBody=await request.json()
    const token=request.cookies.get('token')?.value ||''
    const tokendata=jwt.verify(token,process.env.TOKEN_SECRET!)
    console.log("this is reqbody",tokendata.email)
    const {shopName,address,contactInfo,operatingHours}=reqBody
    console.log("this is shopName",shopName)
    const details=new shopDetail({
      ShopName:shopName,
      email:tokendata.email,
        Address:address,
        Contact: contactInfo,
        hours: operatingHours,
        isApproved:false,
       
    
    })
    const saveddetails=await details.save()
    console.log("saved details",saveddetails)
    return NextResponse.json({message:"successfully added service"})
  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}
export  async function GET(request:NextRequest,response:NextResponse) { 
  try {
    const token=request.cookies.get('token')?.value||''
    const tokendata=jwt.verify(token,process.env.TOKEN_SECRET!)
    const email=tokendata.email
    const details=await shopDetail.find({email})
    return NextResponse.json({message:"successfully added service",data:details})
  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}