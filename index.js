const express = require("express")
const {dbConection} = require("./database/config")
require("dotenv").config();
const cors = require("cors")

const app = express();
app.use(cors())
dbConection()

app.get("/", (req, res) =>{
    res.status(200).json({
        ok: true,
        msj:"prueba"
    })
})

app.listen(process.env.PORT, () =>{
    console.log("server in port"+process.env.PORT)
})