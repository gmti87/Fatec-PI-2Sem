var mysql = require('mysql2');
var database = "TechVagas";

var conexao = mysql.createConnection({
    user: 'root',
    password: '123456789',
    host: 'localhost',
    port: 3306,
});

conexao.connect((err) => {
    if (err) {
        console.log("Erro ao conectar ao Servidor MySql...", err);
        return;
    } else {
        conexao.query("USE " + database);
        console.log("\nConexão Mysql Estabilizada com sucesso!!!\n");
    }
});

module.exports = conexao;