import mongoose from "mongoose";
const details=new mongoose.Schema({
    ShopName:{
        type:String
    },
    Address:{
        type:String
    },
    Contact:{
        type:String

    },
    OwnerId:{
        type:String
    },
    isApproved:{
        type:Boolean
    },
    email:{
        type:String
    }
})
const shopDetail=mongoose.models.ShopDetails || mongoose.model("ShopDetails",details)
export default shopDetail