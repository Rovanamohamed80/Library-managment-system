import sequelize from "../dbConnection.js";
import {DataTypes} from "sequelize"
export const bookModel = sequelize.define('book',
    {
      title:{
        type:DataTypes.STRING(100)
      },
      author:{
        type:DataTypes.STRING(100)
      },
      genre:{
        type:DataTypes.STRING(100)
      },createdBy:{
        type:DataTypes.STRING(100)
      },bookStatus:{
        type:DataTypes.STRING(100),
        defaultValue:"available"
      }
    }
)