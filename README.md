# Conhecimento +50

Plataforma de troca de conhecimento e conexão para pessoas com 50 anos ou mais.

## Visão

O Conhecimento +50 foi pensado para conectar experiências, saberes e oportunidades entre pessoas maduras que desejam continuar aprendendo, compartilhando e colaborando. A proposta é criar uma comunidade acolhedora e inspiradora, onde a vivência de cada pessoa vira valor para o próximo.

## O que a plataforma oferece

- Perfil com interesses, experiências e áreas de especialidade
- Compartilhamento de saberes e histórias de vida
- Busca por pessoas com afinidade ou expertise
- Conexões para mentoria, orientação e aprendizado mútuo
- Espaço para fortalecer redes pessoais, profissionais e sociais

## Público-alvo

- Pessoas acima de 50 anos
- Profissionais em transição de carreira
- Pessoas aposentadas que querem continuar ativas e conectadas
- Mentores, consultores e especialistas em vivência
- Usuários que valorizam troca de saberes e relacionamento humano

## Objetivo

Transformar a experiência em conexão, e a conexão em aprendizado contínuo. O projeto ajuda pessoas a compartilhar conhecimento prático, aprender com diferentes trajetórias e construir vínculos significativos.

## Tecnologias

- React + Vite no frontend
- Java Spring Boot no backend
- JWT para autenticação
- PostgreSQL como banco principal
- Node.js/Express para serviços e prototipagem local

## Como executar localmente

1. Instale as dependências do servidor local:
   ```bash
   npm install
   ```

2. Inicie o Conhecimento +50:
   ```bash
   npm start
   ```

3. Acesse no navegador:
   ```text
   http://localhost:3000
   ```

O assistente de conhecimentos funciona em modo local. Para usar a rota de interpretação do backend Java, inicie o PostgreSQL e o Spring Boot:

```bash
docker compose up -d
cd backend
mvn spring-boot:run
```

## Ideia central

A experiência é um ativo. O Conhecimento +50 transforma sabedoria em conexão, e conexão em aprendizado contínuo.

## Estrutura do projeto

```text
.
├── backend/      # Backend Java Spring Boot
├── frontend/     # Frontend em React + Vite
├── docs/         # Documentação e materiais do produto
├── public/       # Arquivos públicos do projeto
├── data/         # Dados locais e arquivos auxiliares
├── scripts/      # Scripts de utilidade
├── package.json  # Configuração do projeto Node
├── server.js     # Servidor local do projeto
├── index.js      # Entrada da aplicação
└── README.md     # Documentação do projeto
```

## Licença

MIT
