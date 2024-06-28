import Slots from '@/models/Slots'
import jwt from 'jsonwebtoken'
import { NextRequest,NextResponse} from "next/server"
import { connect } from '@/dbconfig/dbconfig'
import shopDetail from '@/models/shopdetails'
connect()
export async function POST(request:NextRequest){
    try {
    const token=request.cookies.get('token')?.value|| ''
    const data=jwt.verify(token,process.env.TOKEN_SECRET!)
    const email=data.email
    const body=await request.json()
    console.log("this is rquest bofy",body)
    const slotsData = body.map((item: { id: number, startTime: string, endTime: string }) => ({
        start: item.startTime,
        end: item.endTime
    }));
    const dbdata=await shopDetail.findOneAndUpdate({email:email},{$set:{slots:slotsData}},{ new: true ,upsert:true} )

    
    const savedslots=await dbdata.save()
    console.log("heyavvv",savedslots)
    return NextResponse.json(savedslots)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}
// export async function GET(request:NextRequest){
//     try {
//     const token=request.cookies.get('token')?.value|| ''
//     const data=jwt.verify(token,process.env.TOKEN_SECRET!)
//  const email=data.email
   
//     const savedslots=await newslot.save()
//     return NextResponse.json(savedslots)
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json(error)
//     }
// }