# Portfolio Rubenilson

Portfólio pessoal de Rubenilson dos Santos Júnior, desenvolvido com Node.js e Express.

## Tecnologias

- Node.js
- Express
- SQLite
- JWT
- bcrypt

## Como executar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse no navegador:
   ```text
   http://localhost:3000
   ```

## Comandos úteis

- `npm run listar:usuarios` - lista os usuários cadastrados no banco local
- `npm run listar:logins` - lista os acessos registrados no banco local

## Estrutura do projeto

```text
.
├── data/       # Banco de dados local (ignorado pelo Git)
├── docs/       # Documentação e materiais auxiliares
├── public/     # HTML, CSS e JavaScript do site
├── scripts/    # Consultas administrativas ao banco
├── index.js    # Rotas e lógica do servidor
├── server.js   # Inicialização da aplicação
└── package.json
```

## Licença

MIT
