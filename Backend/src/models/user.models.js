/*write user.model.js
3 steps  ma 
1st import 
tes paxi schema banauni 
tes paxi model export garni in the basis of schema
*/
import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
            lowercase:true,
        },
        password:{
            type:String,
            required:[true, 'password is required'],//costom error message 
            unique:true,
        },
        Avatar:{
            type:String,

        },
        refreshToken:{
      type:String,
        }
    },
    {
        timestamps:true //creates created at and updated at
    }
)


/*use the prehooks of mongodb ....like the middlware...ata save hunu vanda agadi yo function run hunxa
userSchema.pre("save",()=>{} ) dont write like this cause arrow function dont know the context of "this")
*/
userSchema.pre("save",async function(next){
    if(this.isModified("password")){ //schema ma passsword change huda matra yo pre hook run hunu paryo 
        this.password = bcrypt.hash(this.password,10)
        //bcrypt.hash() uses 2 parameter one chai k hash garni arko chai kati round number le hash garni
            next();
    }
})
/*
userSchema.methods.isPasswordCorrect
mongoose le deko for costom methods ..method name -ipasswordcorrect
When you define a method on the schema 
using userSchema.methods, you are essentially telling
 Mongoose that every document (or instance) created with this schema should have this method available to call.
see notion
 */
userSchema.methods.isPasswordCorrect =async function(password){
        return await bcrypt.compare(password,this.password)//await bcrypt.compare(password,this.password) eti le true ki false return garxa
        // bcrypt.compare() takes 2 parameter data in string ,encrypted password

}
/*
1st 
userSchema.methods.generateAccessToken=function(){}
userSchema.methods.generateRefreshToken=function(){}
*/


userSchema.methods.generateAccessToken=function(){
    // jwt.sign({},{}) takes parameter payload ,..
 return jwt.sign(
    {
        id:this.id,  //left side ko payload and right side comes from mongodb
        email:this.email,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
 )
}
//same like acess token with one payload 
userSchema.methods.generateRefreshToken=function(){
     return jwt.sign(
    {
        id:this.id,  
   
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
 )
}


/*
bcrypt and bcrypt js are generally used ..almost same 
 npm i bcrypt jsonwebtoken
*/
export default User=mongoose.model("user",userSchema);