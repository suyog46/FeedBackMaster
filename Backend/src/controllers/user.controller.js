
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"; 
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


//to push the user data in the db
const user =await User.create({
    username,
    avatar:avatar.url,
    email,
    password
})
/*if the data is pushed successfully then mongodb automatically adds "_id" field 
User.findByOne(user._id) finds user by the _id 
then .select("-password -refreshToknen")...yo bahek aru information chai aaos

*/
const createdUser=await User.findByOne(user._id).select("-password -refreshToknen")

if(!createdUser){
    throw new ApiError(500,"user banauda kehi error vayo")
}

// return res.status(201).json({createdUser}) esari pass garna ko satta we use apiresponse class ko object

res.json(new ApiResponse(200,createdUser,"user registered successfully"))



console.log("register controller ma aako ",email,username)
     return res.json({
        message:"ok"
    })
})
export { registerUser };


  // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res