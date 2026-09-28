const Database = require("better-sqlite3");
const path = require("path");

const database = new Database(path.join(__dirname, "..", "data", "app.db"), { readonly: true });
const usuarios = database.prepare(`
    SELECT id, nome, email, criado_em
    FROM usuarios
    ORDER BY id
`).all();

if (usuarios.length === 0) {
    console.log("Nenhum usuário cadastrado.");
} else {
    console.table(usuarios);
}

database.close();