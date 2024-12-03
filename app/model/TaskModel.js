import mongoose from "mongoose";
const TaskSchema = new mongoose.Schema(

    {
        title:{type:string, required:true},
        description:{type:string, required:true},
        status:{type:string, required:true},
        user_id:{type:mongoose.Schema.types.ObjectId, required:true}
    },
    {
         timestamps:true,
         versionKey:false 
    }
)
   
export default mongoose.model("task", TaskSchema);