import {Router} from 'express'
import {addUser, loginUser} from "./user.controller.js"
import { checkEmail } from '../../middleware/checkEmail.js'
const userRouter =Router()


userRouter.post('/',checkEmail,addUser)

userRouter.post('/signin',loginUser)




export default userRouter