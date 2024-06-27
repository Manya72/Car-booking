import mongoose from 'mongoose'
const serviceschema =new mongoose.Schema({
    location:{
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
    endTime:{
        type:String,
        required:true
    },discount:{
        type:String
    }


})
const Services=mongoose.models.services
|| mongoose.model("services",serviceschema)

export default Services;



