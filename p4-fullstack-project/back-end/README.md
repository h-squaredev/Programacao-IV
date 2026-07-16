# Trabalho Prático - Programação IV (API de Conteúdo Dinâmico)

Esta é uma API RESTful desenvolvida com **NestJS**, utilizando **TypeORM** para persistência no banco de dados **MySQL** e segurança com autenticação **JWT (JSON Web Token)**.

## 🛠️ Pré-requisitos

* Node.js (v24 recomendado)
* MySQL Server rodando localmente

## ⚙️ Configuração do Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_DATABASE=trabalhoFinalP4_db

JWT_SECRET=MINHA_CHAVE_SUPER_SECRETA_P4
JWT_EXPIRES_IN=1h

PORT=3000
```

## 🚀 Como Executar o Projeto

**1. Instalar as dependências:**

```bash
npm install
```

**2. Compilar e rodar a aplicação em desenvolvimento:**

```bash
npm run start:dev
```

**3. Rodar a suíte de testes unitários:**

```bash
npm run test
```

## 🔗 Endpoints da API

### Autenticação & Usuários (Público)

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/users` | Cria um novo usuário criptografando a senha. |
| `POST` | `/auth/login` | Autentica as credenciais e retorna o `access_token` JWT. |

### CRUD de Posts (Rotas Mistas)

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| `GET` | `/posts` | Lista todos os posts ordenados por prioridade. | Público |
| `GET` | `/posts/:id` | Busca os detalhes de um post específico. | Público |
| `POST` | `/posts` | Cria um novo post. | 🔒 Requer `Authorization: Bearer <token>` |
| `PATCH` | `/posts/:id` | Atualiza dados de um post. | 🔒 Requer `Authorization: Bearer <token>` |
| `DELETE` | `/posts/:id` | Remove um post do banco de dados. | 🔒 Requer `Authorization: Bearer <token>` |

---

## 🧪 Testando os Seus Testes Unitários

No seu terminal, execute o seguinte comando para validar se a sua suíte de testes passa com sucesso:

```bash
npm run test
```

Se tudo estiver correto, você verá no console a mensagem verde:

```
PASS src/posts/posts.service.spec.ts ✅
```
