import {Router} from 'express'
import {addbook,deletebook,listbook,searchbook,updatebook} from "./book.controller.js"
import { verifyToken } from '../../middleware/verifyToken.js'

const bookRouter =Router()


bookRouter.post('/',verifyToken,addbook)
bookRouter.put('/:id',verifyToken,updatebook)
bookRouter.delete('/:id',verifyToken,deletebook)
bookRouter.get('/',verifyToken,listbook)
bookRouter.get('/search',verifyToken,searchbook)

export default bookRouter