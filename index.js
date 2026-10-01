const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const SECRET = process.env.JWT_SECRET || "chave-secreta";
const dataDirectory = path.join(__dirname, "data");

fs.mkdirSync(dataDirectory, { recursive: true });

const database = new Database(path.join(dataDirectory, "app.db"));
database.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha_hash TEXT NOT NULL,
        criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS login_eventos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        acessado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    )
`);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"), { index: false }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "conhecimento.html"));
});

app.post("/cadastro", async (req, res) => {
    const { nome, email, senha } = req.body;
    const emailNormalizado = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!nome || !emailNormalizado || !senha) {
        return res.status(400).json({ mensagem: "Preencha nome, email e senha." });
    }

    try {
        const senhaHash = await bcrypt.hash(senha, 10);
        const inserirUsuario = database.prepare(`
            INSERT INTO usuarios (nome, email, senha_hash)
            VALUES (?, ?, ?)
        `);

        inserirUsuario.run(nome.trim(), emailNormalizado, senhaHash);

        return res.status(201).json({ mensagem: "Cadastro realizado com sucesso!" });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({ mensagem: "Este email já está cadastrado." });
        }

        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
    }
});

app.post("/login", async (req, res) => {
    const { email, senha } = req.body;
    const emailNormalizado = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!emailNormalizado || !senha) {
        return res.status(400).json({ mensagem: "Informe email e senha." });
    }

    const usuario = database.prepare(`
        SELECT id, nome, email, senha_hash
        FROM usuarios
        WHERE email = ?
    `).get(emailNormalizado);

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
        return res.status(401).json({ mensagem: "Email ou senha incorretos." });
    }

    database.prepare(`
        INSERT INTO login_eventos (usuario_id)
        VALUES (?)
    `).run(usuario.id);

    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        SECRET,
        { expiresIn: "2h" }
    );

    return res.json({
        mensagem: "Login realizado com sucesso!",
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
        token
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});