import { bookModel } from "../../databases/models/book.model.js"
import { borrowingModel } from "../../databases/models/borrowing.model.js";
import { userModel } from "../../databases/models/user.model.js";

const addborrowing = async (req, res) => {
    const { bookId } = req.params;
    const { borrowingDate,returnDate} =req.body;
    const book = await bookModel.findOne({
        where: {
            id:bookId,
        },
    });
    if(!book){
     return res.status(201).json({message: "book is not found"});
    }else{
        if(book.bookStatus == "available"){
            const book = await bookModel.update({bookStatus:"borrowed"},{where:{id:bookId}})
            req.body.createdBy = req.user.id
                let createdBy = req.body.createdBy
                const borrowing = await borrowingModel.create({
                    bookId,
                    borrowingDate: new Date(borrowingDate).toDateString(),
                    returnDate: new Date(returnDate).toDateString(),
                    createdBy,
                });
            return res.status(201).json({ message: "Borrowing added successfully", borrowing });
        }else{
        return res.status(404).json({ message: "book is not available now"});}
    }

};
const returnborrowing = async (req, res) => {
    const { bookId } = req.params;
    const book = await bookModel.findOne({
        where: {
            id:bookId,
        },
    });
    if(!book){
     return res.status(201).json({message: "book is not found"});
    }else{
        const borrow = await borrowingModel.findOne({
            where: {
                id:bookId,createdBy:req.user.id
            },
        });
        if(borrow){
        if(book.bookStatus == "borrowed"){
            const book = await bookModel.update({bookStatus:"available"},{where:{id:bookId}})

                const borrowing = await borrowingModel.destroy({
                   where:{
                    bookId:req.params.bookId
                   }
                });
            return res.status(201).json({ message: "returning done successfully", book });
        }else{
        return res.status(404).json({ message: "book is not borrowed"});}
     }
     return res.status(422).json({ message: " this user can not return this book"});
     }

};

const listborrowing = async(req,res)=>{

        const borrow = await borrowingModel.findAll({
            where: {
              createdBy:req.user.id
            },
        });
        if(borrow.length >0 ){
            return res.status(200).json({ message: " done successfully", borrow });
        }
     return res.status(422).json({ message: " this user does not have any borrowed books"});
     };


export {
    addborrowing,listborrowing,returnborrowing
}