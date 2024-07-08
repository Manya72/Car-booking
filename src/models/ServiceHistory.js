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


    },
    status:{
        type:String,
        default:'Pending'
    },

 review: {
    type: String,
    default: '',
  },
  ContactUser: {
    type: Number,
    
  }

})
const History=mongoose.models.userServiceHistories
|| mongoose.model("userServiceHistories",userSchema)

export default History;



