import {Sequelize} from "sequelize"

const sequelize = new Sequelize('examm',"root",'',{
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate().then(()=>{
    console.log("success");
}).catch((err)=>{
    console.error(failed);
})

export default sequelize