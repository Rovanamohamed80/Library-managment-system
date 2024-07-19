import sequelize from "../dbConnection.js";
import {DataTypes} from "sequelize"
import { bookModel } from "./book.model.js";
export const borrowingModel = sequelize.define('borrowing',
    {
      borrowingDate:{
        type:DataTypes.STRING(100)
      },
      returnDate:{
        type:DataTypes.STRING(100)
      },createdBy:{
        type:DataTypes.STRING(100)
      }
    },{timestamps:true}
)

borrowingModel.belongsTo(bookModel)