const express = require("express");
const cors = require("cors")
const mysql = require("mysql2/promise")
let connection;
async function startServer(){
    connection = await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"todas_as_receitas"
    })
    app.listen(PORT, ()=>{
        console.log("O servidor está rodando na porta:", PORT)
    })
}

const app = express();

app.use(express.json(), cors());

const PORT = process.env.PORT || 3000;


app.get("/status", (rep, res)=>{
    const status = {
        "Status": "Rodando"
    }
    res.send(status)
})

app.get("/receitas", async (req, res)=> {
    try{
        const [results] = await connection.query("select * from receitas;");
        const receitas = results.map(receita =>({
            ...receita,
        }));
        res.json(receitas);
    }catch(
        err
    ){
        res.status(500).json({erro: err.message});
    }
}
)
startServer();