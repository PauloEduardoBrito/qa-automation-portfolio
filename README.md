# QA Automation Portfolio

Projeto de portfólio voltado à prática de Quality Assurance (QA), automação de testes e integração contínua, utilizando Cypress e uma aplicação de demonstração desenvolvida com Node.js e Express.

## Objetivo

Demonstrar conhecimentos práticos em automação de testes de API e interface, validação de autenticação, proteção de rotas, geração de relatórios e execução automatizada de testes em pipeline CI/CD.

## Tecnologias utilizadas

- Node.js e Express
- JavaScript e HTML
- Cypress
- cypress-mochawesome-reporter
- Git e GitHub
- GitHub Actions
- Jira para gestão das atividades

## Funcionalidades da aplicação

- Verificação de disponibilidade da API.
- Login com validação de credenciais.
- Autenticação baseada em sessão.
- Consulta do estado de autenticação.
- Proteção de acesso ao dashboard.
- Exibição do usuário autenticado.

## Testes automatizados

A suíte Cypress contempla:

- Testes de API.
- Login com credenciais válidas e inválidas.
- Validação da autenticação e da sessão.
- Testes da interface de login.
- Persistência da autenticação após atualização da página.
- Proteção de acesso ao dashboard.
- Validação da exibição do usuário autenticado.

## Execução local

### Pré-requisitos

- Node.js e npm instalados.
- Git instalado.

### Instalar as dependências

```bash
git clone https://github.com/PauloEduardoBrito/qa-automation-portfolio.git
cd qa-automation-portfolio
npm ci
```

### Iniciar a aplicação

```bash
npm start
```

Acesse `http://localhost:3000`.

### Executar os testes

Com a aplicação em execução, abra outro terminal na raiz do projeto:

```bash
npm test
```

Para abrir a interface interativa do Cypress:

```bash
npm run test:open
```

## Relatórios de execução

O projeto utiliza `cypress-mochawesome-reporter` para gerar relatórios HTML.

Após a execução dos testes, o relatório local fica disponível em:

`cypress/reports/html/index.html`

A pasta de relatórios gerados não é versionada no Git.

## Integração contínua — GitHub Actions

O workflow está definido em `.github/workflows/cypress.yml`.

A pipeline executa automaticamente em eventos de `push` e `pull_request` direcionados à branch `main`.

As etapas incluem instalação de dependências, inicialização da aplicação, execução da suíte Cypress e publicação do relatório HTML como artefato, quando disponível.

O artefato `cypress-html-report` possui retenção configurada para 14 dias.

A execução da pipeline e a consulta do artefato foram validadas com sucesso.

## Credenciais de demonstração

Para uso local:

- **Usuário:** `admin`
- **Senha:** `123456`

Credenciais fictícias para fins de demonstração. Não utilizar em ambientes reais.

## Documentação técnica

Consulte [`docs/technical-overview.md`](docs/technical-overview.md) para conhecer a arquitetura, a organização dos testes, a execução local, os relatórios e o pipeline CI/CD.

## Próximas evoluções

- Publicar evidências automáticas de falhas nos testes.
- Integrar a execução dos testes ao Jenkins.
- Expandir a cobertura de testes e a documentação técnica.

## Status

Projeto em evolução contínua. A suíte Cypress, a geração de relatórios HTML e a execução automatizada pelo GitHub Actions foram implementadas e validadas.