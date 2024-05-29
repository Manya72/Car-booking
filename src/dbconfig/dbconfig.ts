import mongoose from 'mongoose'
export async function connect(){
    try{
        mongoose.connect(process.env.mongo_url!);
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("mongodb connected");
        })
       connection.on('error',(err)=>{
        console.log('error in connecting mongodb')
        process.exit()
       })

    }catch(error){
        console.log(error);

    }
}
