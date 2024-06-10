import {connect} from "@/dbconfig/dbconfig"

import { NextRequest,NextResponse} from "next/server"
// import History from "@/models/ServiceHistory";
import User from "@/models/userModel";

connect()

export async function DELETE(username:any){
   try {

    const parts = username.url.split('/');
    const un = parts[parts.length - 1];
      const userdata=await User.deleteOne({username:un});
   
      return NextResponse.json({
        status:200,
        message:"datafetched"
      })
   } catch (error) {
    return NextResponse.json({error:error})
   }
} 