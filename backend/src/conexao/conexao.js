var mysql = require("mysql2");
var database = "techvagas_thiago"; 

// instanciar objeto de acesso ao banco de dados
var conexao = mysql.createConnection({
  user: "root",
  password: "123456789",
  host: "localhost",
  port: 3306,
}); 

conexao.connect((err) => {
  if (err) {
    console.log("Erro ao conectar ao Servidor Mysql...", err);
    return;
  } else {

    conexao.query("use " + database);
    console.log("\nConexão Mysql Estabilizada com Sucesso!!!\n");
  }
});

module.exports = conexao;