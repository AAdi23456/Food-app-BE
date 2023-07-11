

const express = require("express")

const app = express()
const cors = require("cors");
app.use(express.json())
const {Authorization,register,login} = require("./routes/Regstration")
const { connection } = require("./database/mongodb")
const Crudroutes = require("./routes/CRUDop")
app.use(cors())
app.use("/register",register)
app.use("/login",login)
app.use("/user", Authorization)
app.use("/", Crudroutes)


app.listen(8080, () => {
    try {
        connection()
    } catch (error) {
        console.log(error);
    }
});
