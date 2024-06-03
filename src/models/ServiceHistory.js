import mongoose from 'mongoose'
const userSchema =new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        
    },
    carShopOwner:{                                                                                                                          
        type:String,
        required:true,
     
    },
    date:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:
    {
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true


    }


})
const History=mongoose.models.userServiceHistories
|| mongoose.model("userServiceHistories",userSchema)

export default History;



