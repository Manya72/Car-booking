// import {connect} from "@/dbconfig/dbconfig"

// import { NextRequest,NextResponse} from "next/server"
// import History from "@/models/ServiceHistory";
// import User from "@/models/userModel";

// connect()

// export async function DELETE({params}:any){
//    try {
//     console.log("user data for the admin",params)
//       const body=params;
//       const servicedata=await User.find();
//       console.log("user data for the admin",body)
//       return NextResponse.json({
//         data:body,
//         message:"datafetched"
//       })
//    } catch (error) {
//     return NextResponse.json({error:error})
//    }
// } 