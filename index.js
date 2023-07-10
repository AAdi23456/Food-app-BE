

const express = require("express")

const app = express()
const cors = require("cors");
app.use(express.json())
const Authrozation = require("./routes/Regstration")
const { connection } = require("./database/mongodb")
const Crudroutes = require("./routes/CRUDop")
app.use(cors())

app.use("/auth", Authrozation)
app.use("/", Crudroutes)


app.listen(8080, () => {
    try {
        connection()
    } catch (error) {
        console.log(error);
    }
});
