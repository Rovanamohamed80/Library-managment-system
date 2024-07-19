import express from 'express'
import sequelize from './databases/dbConnection.js'
import { userModel } from './databases/models/user.model.js'
import userRouter from './modules/users/user.routes.js'
import bookRouter from './modules/books/book.routes.js'
import { borrowingModel } from './databases/models/borrowing.model.js'
import borrowingRouter from './modules/borrowings/borrowing.routes.js'
const app = express()
const port = 3000
app.use(express.json())
app.use('/users',userRouter)
app.use('/books',bookRouter)
app.use('/',borrowingRouter)
sequelize.sync({alter:false})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))