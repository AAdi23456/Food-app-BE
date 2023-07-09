
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const express = require("express")
const app = express()
const cors = require("cors");
app.use(express.json())
const Authrozation = require("./routes/Regstration")
const { connection } = require("./database/mongodb")
const Crudroutes = require("./routes/CRUDop")
app.use(cors())
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My API",
        version: "1.0.0",
        description: "API documentation using Swagger",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
      ],
    },
    apis: ["./routes/*.js"], 
  };
const specs = swaggerJsdoc(options);
app.use("/", Crudroutes)
app.use("/auth", Authrozation)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.listen(3000, () => {
    try {
        connection()
    } catch (error) {
        console.log(error);
    }
});
