# Inventory API

API REST para controle de estoque utilizando Node.js, TypeScript, Express e MySQL.

## Requisitos

- Node.js (versão LTS recomendada)
- MySQL

## Configuração

1. Clone o repositório e instale as dependências:

   \`\`\`bash
   npm install
   \`\`\`

2. Configure as variáveis de ambiente no arquivo **.env**.

3. Execute as migrações para criar as tabelas no banco de dados:

   \`\`\`bash
   npm run migration
   \`\`\`

## Desenvolvimento

Para rodar a aplicação em modo de desenvolvimento:

\`\`\`bash
npm run dev
\`\`\`

## Testes

Para executar os testes:

\`\`\`bash
npm test
\`\`\`

## Lint e Formatação

- Para verificar o código com ESLint:

  \`\`\`bash
  npm run lint
  \`\`\`

- Para formatar o código com Prettier:

  \`\`\`bash
  npm run format
  \`\`\`
