import { app } from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js";


console.log("hello");

dotenv.config({
    path:"./.env"
})

const port=process.env.PORT || 3002

connectDB().then(()=>{
    app.listen(port ,()=>{
        console.log(`server is running on the port ${port}`)
    })
    
}).catch((err)=>{
    console.log("eroor",err)
})

