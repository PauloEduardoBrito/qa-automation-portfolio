
# QA Automation Portfolio

Projeto de portfólio para demonstrar práticas de Quality Assurance (QA) e automação de testes com Cypress.

## Objetivo

Desenvolver uma aplicação de login simples para praticar testes de API, testes de interface, autenticação baseada em sessão e proteção de acesso ao dashboard.

## Tecnologias utilizadas

- Node.js
- Express
- Cypress
- JavaScript
- HTML
- Git e GitHub

## Funcionalidades implementadas

- Endpoint de saúde da API (`GET /api/health`).
- Login com validação de credenciais (`POST /api/login`).
- Consulta da sessão autenticada (`GET /api/me`).
- Persistência da autenticação por sessão.
- Proteção da rota `/dashboard`.
- Exibição do usuário autenticado no dashboard.

## Pré-requisitos

- Node.js e npm instalados.
- Git instalado.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/PauloEduardoBrito/qa-automation-portfolio.git
cd qa-automation-portfolio
```

Instale as dependências:

```bash
npm install
```

## Executar a aplicação

Inicie o servidor:

```bash
node server/server.js
```

Acesse a aplicação em:

http://localhost:3000

## Executar os testes automatizados

Com o servidor em execução, abra outro terminal na pasta do projeto e execute toda a suíte:

```bash
npx cypress run
```

Para abrir a interface do Cypress:

```bash
npx cypress open
```

## Cobertura de testes

Os testes atuais cobrem:

- Saúde da API.
- Login com credenciais válidas e inválidas.
- Autenticação e consulta da sessão.
- Login pela interface.
- Persistência da autenticação após atualizar a página.
- Proteção de acesso ao dashboard.
- Exibição do usuário autenticado.

## Credenciais de demonstração

Para uso local:

- Usuário: `admin`
- Senha: `123456`

Essas credenciais são fictícias e destinadas exclusivamente ao ambiente de demonstração.

## Status do projeto

Projeto em desenvolvimento. A cobertura automatizada existente foi executada localmente com sucesso. A configuração de CI/CD ainda está pendente.
