const Database = require("better-sqlite3");

const database = new Database("data/app.db", { readonly: true });
const logins = database.prepare(`
    SELECT
        usuarios.nome,
        usuarios.email,
        login_eventos.acessado_em
    FROM login_eventos
    INNER JOIN usuarios ON usuarios.id = login_eventos.usuario_id
    ORDER BY login_eventos.acessado_em DESC
`).all();

if (logins.length === 0) {
    console.log("Nenhum login registrado ainda.");
} else {
    console.table(logins);
}

database.close();