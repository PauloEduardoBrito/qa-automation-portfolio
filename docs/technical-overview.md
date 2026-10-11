# Documentação Técnica — QA Automation Portfolio

## 1. Visão geral

O QA Automation Portfolio é um projeto de demonstração de práticas de Quality Assurance, automação de testes e integração contínua.

A aplicação disponibiliza uma funcionalidade de login com autenticação baseada em sessão, consulta de autenticação e proteção de acesso ao dashboard.

O projeto é utilizado para praticar automação de testes de API e interface, validação de comportamento, análise de falhas e execução automatizada dos testes em pipeline.

## 2. Tecnologias utilizadas

- Node.js
- Express
- JavaScript
- HTML
- Cypress
- cypress-mochawesome-reporter
- Git e GitHub
- GitHub Actions
- Jira para gestão das atividades

## 3. Arquitetura da aplicação

### Backend

O servidor está implementado em `server/server.js`, utilizando Express.

Principais endpoints:

| Método | Endpoint | Finalidade |
|---|---|---|
| GET | `/api/health` | Verificar se a API está funcionando |
| POST | `/api/login` | Validar credenciais e iniciar a sessão |
| GET | `/api/me` | Consultar o estado da autenticação |

A autenticação utiliza sessões com `express-session`.

### Interface

O arquivo `app/index.html` disponibiliza a interface de login.

O dashboard está em `private/dashboard.html` e é servido pela rota `/dashboard`, que verifica a autenticação antes de disponibilizar a página.

O acesso não autenticado à rota protegida redireciona o usuário para a página inicial.

## 4. Estrutura dos testes automatizados

Os testes estão organizados em `cypress/e2e/`.

- `health-api.cy.js`: validação do endpoint de saúde.
- `login-api.cy.js`: testes de login pela API com credenciais válidas e inválidas.
- `auth-api.cy.js`: validação da autenticação e consulta da sessão.
- `login.cy.js`: testes da interface de login e persistência da autenticação.
- `dashboard.cy.js`: testes de proteção de acesso e exibição do usuário autenticado.

Os arquivos de suporte do Cypress ficam em `cypress/support/`.

## 5. Execução local

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/PauloEduardoBrito/qa-automation-portfolio.git
cd qa-automation-portfolio
npm ci
```

### Iniciar a aplicação

```bash
npm start
```

A aplicação ficará disponível em `http://localhost:3000`.

### Executar os testes

Em outro terminal, na raiz do projeto:

```bash
npm test
```

Para abrir a interface interativa do Cypress:

```bash
npm run test:open
```

## 6. Relatórios de execução

O projeto utiliza `cypress-mochawesome-reporter` para gerar relatórios HTML da execução dos testes.

O relatório local é gerado em:

`cypress/reports/html/index.html`

A pasta de relatórios gerados está excluída do versionamento por meio do `.gitignore`.

## 7. Integração contínua — GitHub Actions

O pipeline está definido em:

`.github/workflows/cypress.yml`

A execução é acionada por eventos de `push` e `pull_request` direcionados à branch `main`.

O pipeline executa as seguintes etapas:

1. Obtém o código do repositório.
2. Configura o Node.js.
3. Instala as dependências com `npm ci`.
4. Inicia a aplicação Express.
5. Aguarda a disponibilidade do endpoint de saúde.
6. Executa a suíte Cypress.
7. Publica o relatório HTML como artefato, quando disponível.

O artefato utiliza o nome `cypress-html-report` e tem retenção configurada para 14 dias.

A execução do pipeline foi validada com sucesso no GitHub Actions.

## 8. Credenciais de demonstração

Para uso local:

- Usuário: `admin`
- Senha: `123456`

Essas credenciais são fictícias e destinadas exclusivamente à aplicação de demonstração. Não devem ser reutilizadas em ambientes reais.

## 9. Próximas evoluções planejadas

- Gerar e publicar evidências automáticas de falhas, incluindo capturas de tela e avaliação da gravação de vídeos.
- Integrar o projeto ao Jenkins para executar os testes em outro ambiente de CI/CD.
- Aprimorar a documentação conforme novas funcionalidades forem implementadas.

## 10. Considerações

Este projeto tem finalidade educacional e de portfólio. A implementação demonstra práticas de automação de testes, validação de APIs, autenticação por sessão, proteção de rotas, geração de relatórios e integração contínua.