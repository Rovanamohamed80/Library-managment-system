import { userModel } from "../../databases/models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const addUser = async (req,res)=>{
  let user = await userModel.create(req.body)
  return res.status(201).json({message: "User created successfully",user})

}

const loginUser = async(req,res)=>{
  let user = await userModel.findOne({
    where:{
      name:req.body.name
    }
  })
  if(!user){
    return res.status(409).json({ message: "User is not found" });
  }else{
    let validpass = bcrypt.compareSync(req.body.password,user.password);
    if(validpass){
      let token = jwt.sign({id:user.id,name:user.name,role:user.role},"routeExam")
      console.log(token);
      return res.status(201).json({message: "user login successfully",token:token})
    }else{
    return res.status(422).json({message: "invalid password"})}}
  }


export {
    addUser,loginUser
}