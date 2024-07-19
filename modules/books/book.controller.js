import { bookModel } from "../../databases/models/book.model.js"
import { userModel } from "../../databases/models/user.model.js";

const addbook = async(req,res)=>{
  const { title,author,genre} =req.body;

    const user = await userModel.findOne({
      where:{
        id:req.user.id, role:"admin"
      }
    })
    if(!user){
     return res.status(409).json({ message: "only admins have an access to add books" });
    }
    req.body.createdBy = req.user.id
    let createdBy = req.body.createdBy
    const book = await bookModel.create({title,author,genre,createdBy})
  return res.status(201).json({message: "book added successfully",book})
  
 }   
 const updatebook = async (req, res) => {
  const{id}=req.params;
  const {title, author, genre } = req.body; 
  const user = await userModel.findOne({
    where:{
      id:req.user.id, role:"admin"
    }
  })
  if(!user){
   return res.status(409).json({ message: "only admins have an access to update books" });
  }
    const [created] = await bookModel.update(
      { title, author,genre},
      { where: {id} }
    );
    if (created) {
      return res.status(200).json({ message: "book updated successfully", book: created });
      
    }
    return res.status(404).json({ message: "this book is not found" });
  };
const deletebook = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findOne({
    where: {
      id: req.user.id, role: "admin"
    }
  })
  if (!user) {
    return res.status(409).json({ message: "only admins have an access to delete books" });
  }
  const deleted = await bookModel.destroy(
    { where: { id } }
  );
  if (deleted) {
    return res.status(200).json({ message: "book deleted successfully", book: deleted });
  }
  return res.status(404).json({ message: "this book is not found" });
};

const listbook = async(req,res)=>{
  let book = await  bookModel.findAll({where:{
    bookStatus:"available"
  }})
  if(book){
    return res.json({message:"success",allBooks:book})}
  
 }
 const searchbook = async(req,res)=>{
  const { title , author , genre}= req.query
  if(title){
  let book = await  bookModel.findAll({where:{title}})
  if(book.length>0){
    return res.json({ message: "success", book });
    }
     else{
       return res.json({ message: "this book is does not found"});
  }}
  if(author){
    let book = await  bookModel.findAll({where:{author}})
  if(book.length>0){
    return res.json({ message: "success", book });
    }
     else{
       return res.json({ message: "this book is does not found"});
  }
  }
  if(genre){
    let book = await  bookModel.findAll({where:{genre}})
  if(book.length>0){
    return res.json({ message: "success", book });
    }
     else{
       return res.json({ message: "this book is does not found"});
  }
  }
  
 }

export {
    addbook,updatebook,deletebook,listbook,searchbook
}