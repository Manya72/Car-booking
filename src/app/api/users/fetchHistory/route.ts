import { NextRequest,NextResponse} from "next/server"
import { connect } from '@/dbconfig/dbconfig';
import History from '@/models/ServiceHistory';
connect()
console.log("from fetch")
export  async function GET(response:NextResponse) { //for the user dashboard
  try {
    const userHistory=await History.find()
    return NextResponse.json(userHistory)
  } catch (error) {
    return NextResponse.json({message:error})
    
  }
}
 

