const express = require("express");

const cors = require("cors");

const path = require("path");

const session = require("express-session");

const app = express();

const port = 3000;

//app.use(cors());

app.use(cors({
    origin: "http://localhost:5500",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// novo
app.use(session({
    secret: "techvagas",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

const fs = require('fs');

// Instanciando Rotas

const indexRouter = require("./routes/indexRoutes.js");

// Rotas

app.use("/login", indexRouter);

// instanciar o servidor web

try {
    app.listen(port, () => {
        console.log(`Servidor Rodando em http://localhost:${port}`);
    })
} catch (error) {
        console.log("Ocorreu um erro!!");
}
