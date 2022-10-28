const mongoose = require('mongoose');

require("dotenv").config()
const dbConection =  async () =>{
    
    try{
        await mongoose.connect(process.env.DB_CNN);
        console.log("DB Online")
    }catch(e){
        console.log("ocurrio un error en la coneccion de la DB",e)
    }

}

module.exports = {
    dbConection
}
