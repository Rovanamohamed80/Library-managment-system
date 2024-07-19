import { userModel } from "../databases/models/user.model.js";
import bcrypt from "bcrypt"

export const checkEmail = async(req,res,next) =>{
    let user = await userModel.findOne({
        where:{
          name:req.body.name
       }}
      )
      if(user)
        return res.status(409).json({ message: "User already exists" });
        req.body.password = bcrypt.hashSync(req.body.password, 8)
        next()
      
}