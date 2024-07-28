
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"

const registerUser= asyncHandler(async (req,res)=>{
    console.log("registeruser aayo")
const {email,username,password}=req.body;


if(
    [email,username,password].some((field)=>field?.trim() === "")
){
    throw new ApiError(400, "All fields are required");
}

const existedUser = await User.findOne({
    $or: [{ username }, { email }]
})

if (existedUser) {
    throw new ApiError(409, "User with email or username already exists")
}
const avatarLocalPath = req.files?.avatar[0]?.path;
if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
}
/*?.: This is the optional chaining operator. It is used to safely access nested properties,
 ensuring that if any part of the chain is undefined or null, it will short-circuit and return undefined instead of throwing an error.*/
const avatar = await uploadOnCloudinary(avatarLocalPath)

console.log("register controller ma aako ",email,username)
     return res.json({
        message:"ok"
    })
})
export { registerUser };