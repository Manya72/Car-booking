import {connect} from "@/dbconfig/dbconfig"

import { NextRequest,NextResponse} from "next/server"
// import History from "@/models/ServiceHistory";
import Services from "@/models/ServiceAvailability";
connect()

export async function DELETE(id:any){
   try {

    const parts = id.url.split('/');
    const un = parts[parts.length - 1];
    console.log("un hahaa",un)
      const userdata=await Services.deleteOne({_id:un});
      console.log("from the deleteuser route",userdata)
      return NextResponse.json({
        status:200,
        message:"datafetched"
      })
   } catch (error) {
    return NextResponse.json({error:error})
   }
} 
export async function PUT(request:NextRequest){
    try {
    console.log("heyyaa from put sabnaja")
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
     const reqbody=await request.json()
     console.log("firt body",reqbody)
     const service = await Services.findByIdAndUpdate(id, reqbody, { new: true });
    
       return NextResponse.json({
         status:200,
         message:"datafetched"
       })
    } catch (error) {
        console.log(error)
     return NextResponse.json({error:error})
    }
 } 