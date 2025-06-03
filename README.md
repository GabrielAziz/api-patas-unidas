
# API Patas Unidas

API REST para o projeto Patas Unidas, que visa conectar ONGs de proteção animal com pessoas interessadas em adotar ou ajudar.

Este projeto é uma API RESTful desenvolvida em Node.js, TypeScript, Express e Prisma, com autenticação JWT, validação de dados com ZOD e boas práticas de arquitetura.

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT
- ZOD

## Pré-requisitos

- Node.js ( v18.20.8 )
- npm ( npm v10.8.2 )
- MySQL (v8+ recomendado)
- Variáveis de ambiente configuradas (ver arquivo`.env`)

## .ENV
   ```
   DATABASE_URL="mysql://usuario:senha@localhost:3306/patas_unidas"
   PORT=3000
   JWT_SECRET="your-secret"
   NODE_ENV="development"
   CORS_ORIGIN="http://localhost:3000"
   ```

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/api-patas-unidas.git
   cd api-patas-unidas
   ```

2. **Instale as dependências:**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure o banco de dados:**

   - Instale o MySql

      ``` bash 
      sudo apt update
      sudo apt install mysql-server
      ```

   - Acesse o mysql como root
      ```bash
      sudo mysql
      ```
   - Crie um banco de dados MySQL (nome: `patas_unidas`):
      ```sql
      CREATE DATABASE patas_unidas;
      ```

   - Crie um usuario no banco:
      ```sql
      CREATE USER 'gabi'@'localhost' IDENTIFIED BY 'gabi1234';
      GRANT ALL PRIVILEGES ON *.* TO 'gabi'@'localhost' WITH GRANT OPTION;
      FLUSH PRIVILEGES;
      ```

   - Saia do Mysql
      ```sql
      EXIT;
      ```

4. **Rode as migrations do Prisma:**

   ```bash
   npx prisma migrate dev
   ```

5. **(Opcional) Popule o banco com dados iniciais:**

   ```bash
   npx prisma db seed
   ```

## Rodando o servidor em desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3000` (ou porta definida no seu `.env`).

## Scripts úteis

- `npm run dev` — Inicia o servidor com hot reload (nodemon + ts-node)
- `npm run build` — Compila o projeto para a pasta `dist`
- `npm start` — Executa o servidor a partir do código compilado
- `npx prisma studio` — Abre o Prisma Studio para visualizar e editar dados no banco

## Estrutura de pastas

- `src/` — Código-fonte da aplicação
  - `config/` — Configurações (ex: JWT)
  - `routes/` — Definição das rotas
  - `controllers/` — Controllers das rotas
  - `services/` — Regras de negócio
  - `repositories/` — Acesso ao banco de dados
  - `models/` — Tipos e DTOs
  - `middlewares/` — Middlewares (ex: autenticação)
- `prisma/` — Migrations e schema do Prisma

## Boas práticas adotadas

- Validação de dados no service
- Hash de senha com bcrypt
- Autenticação JWT com cookies HTTP-only
- Soft delete para usuários
- Tipagem forte com TypeScript
- Separação clara de responsabilidades (Controller, Service, Repository)
- Comentários explicativos para facilitar o entendimento do código

## Testando a API

Você pode usar o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar as rotas da API.
Exemplo de endpoints:

- `POST /api/auth/login` — Login de usuário
- `POST /api/users/new` — Cadastro de usuário
- `GET api/users` — Listar usuários (requer autenticação)

## Dúvidas ou problemas?

Abra uma issue ou entre em contato com o mantenedor do projeto.

---

> **Dica:** Sempre reinicie o servidor após alterar arquivos de configuração ou tipos globais para evitar problemas de cache do TypeScript/ts-node.

## Como Contribuir

1. Faça um fork do repositório.
2. Crie um remote upstream apontando pro repositorio oficial: `git remote add upstream git@github.com:GabrielAziz/api-patas-unidas.git`
3. Crie uma branch com sua feature: `git checkout -b minha-feature`.
4. Faça commit das suas mudanças: `git commit -m 'Adiciona minha feature'`.
5. Faça push para sua branch: `git push origin minha-feature`.
6. Abra um pull request.

## Licença

MIT
