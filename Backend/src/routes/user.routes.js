import {Router} from "express";
import {registerUser} from "../controllers/user.controller.js";
import { upload } from "./middlewares/Multer.js";

const router=Router();
router.route("/register").post(upload.fields([{
    name:"Avatar",
    maxcount:1
}]),registerUser);
export {router};