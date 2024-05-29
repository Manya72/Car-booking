import mongoose from 'mongoose'
const userSchema =new mongoose.Schema({
    carType:{
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
    time:{
        type:String,
        required:true
    }


})
const History=mongoose.models.userServiceHistories
|| mongoose.model("userServiceHistories",userSchema)

export default History;



