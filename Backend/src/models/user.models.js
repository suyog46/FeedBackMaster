import mongoose from "mongoose";
const userSchema= new  mongoose.schema(
    {
        username:{
            type:String,
            required:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:[true, 'password is required'],
            unique:true,
        },
        Avatar:{
            type:String,

        }
    }
)
export default User=mongoose.model("user",userSchema);