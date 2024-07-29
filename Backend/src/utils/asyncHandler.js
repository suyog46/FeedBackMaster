//wrapper 
//fn is a function which is executed inside async inside try catch block
const asyncHandler = (fn) =>{
    console.log("async aayo")
     return async (req,res,next)=>{
            try{
                await fn(req,res,next)  
            }
            catch(error){
                console.log(error)
                res.status(error.code).json({
                    success:false,
                    message:error.message
                }
            )
            }
    }
} 

// or we could use it
// const asyncHandler=(function)=>{
//         (req,res,next)=>{
//             Promise.resolve(function(req,res,next)).catch((err)=>{next(err)})
//         }
// }

export {asyncHandler}