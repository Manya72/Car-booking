import { NextRequest ,NextResponse} from 'next/server'
import {connect} from '../../../../dbconfig/dbconfig'
import History from '@/models/ServiceHistory'
connect()
export  async function PATCH(request:NextRequest,response:NextResponse){
    try {
        const reqbody =await request.json()
        const{userId,review}=reqbody
        console.log("id hha heh",reqbody)
        // const answer=await History.findById(_id)
        const history=await History.findByIdAndUpdate(userId,{review:review})
        // console.log("response for the revieww",answer)
        return NextResponse.json({message:"added review "})
        
    } catch (error) {
        return NextResponse.json({error:error })
    }
}