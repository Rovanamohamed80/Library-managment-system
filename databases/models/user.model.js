import sequelize from "../dbConnection.js";
import {DataTypes} from "sequelize"
export const userModel = sequelize.define('user',
    {
      name:{
        type:DataTypes.STRING(100)
      },
      password:{
        type:DataTypes.STRING(100)
      },role:{
        type:DataTypes.STRING(100),
        defaultValue:"user"
      }
    }
)

