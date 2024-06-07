import {connect} from "@/dbconfig/dbconfig"

import { NextRequest,NextResponse} from "next/server"
import History from "@/models/ServiceHistory";


connect()

export async function GET(request:NextRequest){
   try {
      const body=request.json();
      const servicedata=await History.find();
      console.log("user data for the admin",servicedata)
      return NextResponse.json({
        data:servicedata,
        message:"datafetched"
      })
   } catch (error) {
    return NextResponse.json({error:"error "})
   }
} 