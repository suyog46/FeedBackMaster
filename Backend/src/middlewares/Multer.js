// const multer=require('multer'); this is an es module so use import instead of require 

import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })

 export const upload = multer({ 
    storage, 
})