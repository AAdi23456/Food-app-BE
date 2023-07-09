
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const express = require("express")
const specs = require("./swgger")
const app = express()
const cors = require("cors");
app.use(express.json())
const Authrozation = require("./routes/Regstration")
const { connection } = require("./database/mongodb")
const Crudroutes = require("./routes/CRUDop")
app.use(cors())


app.use("/", Crudroutes)
app.use("/auth", Authrozation)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(3000, () => {
    try {
        connection()
    } catch (error) {
        console.log(error);
    }
});
