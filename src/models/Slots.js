import mongoose from "mongoose"
const slotsdetails=new mongoose.Schema({
    email:{
        type:String
    },
    slots:[{
        start:{
            type:String
        },
        end:{
            type:String
        }
    }]
})

const Slots = mongoose.models.SlotsDetails || mongoose.model('SlotsDetails', slotsSchema);
export default Slots
