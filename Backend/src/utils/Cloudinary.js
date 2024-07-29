import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
console.log(process.env.CLOUD_NAME);

cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
})
const uploadOnCloudinary=async(localfilepath)=>{
    try {

        if(!localfilepath){
console.log("localpath aayena ");
            return null
        } 
        //file uploaded on cloudinary
        const response=await  cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
        console.log("file is uploaded",response.url)
fs.unlinkSync(localfilepath);//local storage bata hataidinxa
console.log("file uploaded on cloudinary");
return response;
        }
     catch (error) {
console.log("erro in cloudinary ",error);

        fs.unlinkSync(localfilepath)
        return null;
    }
}

export {uploadOnCloudinary}