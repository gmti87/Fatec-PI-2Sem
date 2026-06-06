const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
const port = 3000;


app.use(session({
    secret: "chave-secreta",
    resave: false,
    saveUninitialized: true
}));

// Configuração de CORS
app.use(cors({
    origin: "http://localhost:5500", // se usar Live Server
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir frontend da pasta correta
app.use(express.static(path.join(__dirname, "../../frontend/public")));

// Rota raiz → abre login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/public/pages/login.html"));
});

// Conexão com banco
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456789",
//   database: "techvagas_thiago"
// });

// Middleware para autenticar token
function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  jwt.verify(token, "segredo_jwt", (err, usuario) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.usuario = usuario;
    next();
  });
}

// Rotas de autenticação
const indexRoutes = require("./routes/indexRoutes");
app.use("/login", indexRoutes);


// Página inicial → login.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/login.html"));
});

// Inicializar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

