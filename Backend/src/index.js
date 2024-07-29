import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
});
import { app } from "./app.js"
import connectDB from "./db/index.js";


console.log("hello");

const port=process.env.PORT || 3002

connectDB().then(()=>{
    app.listen(port ,()=>{
        console.log(`server is running on the port ${port}`)
    })
    
}).catch((err)=>{
    console.log("eroor",err)
})

