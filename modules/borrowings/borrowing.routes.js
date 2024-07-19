import {Router} from 'express'
import {addborrowing,listborrowing, returnborrowing} from "./borrowing.controller.js"
import { verifyToken } from '../../middleware/verifyToken.js'

const borrowingRouter =Router()


borrowingRouter.post('/borrow/:bookId',verifyToken,addborrowing)
borrowingRouter.post('/return/:bookId',verifyToken,returnborrowing)
borrowingRouter.get('/borrowed',verifyToken,listborrowing)


export default borrowingRouter