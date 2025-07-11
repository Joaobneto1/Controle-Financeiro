# 💰 Desafio Front-End | Módulo 08 — Cubos Academy

> Aplicação completa de **controle financeiro pessoal** desenvolvida com React, integrando autenticação, CRUD de transações, filtros, ordenação e temas.

---

## 🎯 Objetivo do Projeto

Construir uma aplicação front-end robusta com as seguintes funcionalidades:

- Cadastro e login de usuários 
- Listagem e gerenciamento de transações 
- Resumo financeiro (entradas, saídas e saldo) 
- Filtros por categoria e ordenação por data
- Edição de perfil

---

## 🖼️ Design e API

- 🎨 [Layout no Figma](https://www.figma.com/file/BwOAJkF8OeMON36TyFdhkj/DinDin-2.0?node-id=0%3A1)
- 📄 [Documentação da API](https://github.com/cubos-academy/desafio-frontend-md3-ddst10/wiki/Documenta%C3%A7%C3%A3o-da-API)

---

## 🛠️ Funcionalidades

### 🔐 Autenticação
- Cadastro com validações
- Login com armazenamento de token no `localStorage`
- Proteção de rotas
- Logout

---

### 📋 Transações
- Cadastro de entradas e saídas
- Edição e exclusão
- Modal dinâmico com dados preenchidos
- Atualização automática do resumo

---

### 📊 Resumo e Tabela
- Entradas, saídas e saldo via endpoint `/extrato`
- Listagem com nome do dia da semana
- Coloração condicional para entradas/saídas
- Ordenação por data

---

### 🔎 Filtros
- Filtro cumulativo por categorias
- Aplicar e limpar filtros com recarregamento dinâmico

---

### 👤 Perfil
- Modal de edição de nome, email e senha
- Atualização em tempo real após salvar alterações

---

## 🧠 Conhecimentos aplicados

- React + React Hooks
- React Router DOM
- CSS Modules
- Manipulação de estado e efeitos colaterais
- Consumo de API REST com `fetch`
- LocalStorage para persistência
- Componentização e reutilização de layouts

---

## 🚀 Execução

Clone o projeto e inicie o servidor local:

```bash
git clone https://github.com/Joaobneto1/desafio-frontend-m08.git
cd desafio-frontend-m08
npm install
npm start
```

---

## 🤝 Projeto desenvolvido em dupla
- [João Batista](https://github.com/Joaobneto1)
- [Dionata Lima](https://github.com/DionataLima)

---

## 🏷️ Tags
`React` `front-end` `CSS` `API` `JavaScript` `controle-financeiro`
