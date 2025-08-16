# 🧱 Node.js Starter Template with PostgreSQL & User Auth

A clean and scalable Node.js starter template that provides the foundational building blocks for most backend applications. This boilerplate includes essential user functionalities like registration, login, password recovery, and JWT-based authentication. It uses PostgreSQL as the database and follows a modular folder structure for clean and maintainable code.


## ✨ Features

- 🔐 User authentication using JWT
- 📝 User registration & login
- 🧪 Credential validation:
  - Valid email format
  - Strong password policy (min length, complexity, etc.)
  - Duplicate email check
- 🔑 Password recovery with secure reset token
- 🧮 PostgreSQL integration via ORM (TypeORM )
- ✅ Input validation middleware
- 📨 Email service for password recovery
- 🔧 Configurable `.env` support
- 📁 Scalable folder structure (Controllers, Services, Repositories, Routes)
- 🌐 Ready-to-use RESTful APIs


## Use Cases
This template is ideal for kickstarting:

1.SaaS platforms
2.Admin dashboards
3.E-commerce backends
4.Any Node.js backend with user management needs

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/node-auth-template.git
cd node-auth-template

### 2. Install dependencies
npm install

### 3. Create a .env file
 use the .env.example file as template

### 4. run the migration
npx typeorm migration:generate src/migration/init --dataSource src/api/connection.ts
npx typeorm migration:run --dataSource src/api/connection.ts

### 5. run the server
npm run dev
github:https://github.com/Elvinkess



