# Registrul Educational Alternativ

## Continut

Monorepo-ul REAL se foloseste de [yarn](https://yarnpkg.com) pentru package management. Include urmatoarele:

### Apps and Packages

- `formular`: Platforma [Next.js](https://nextjs.org/) pentru formularul esteREAL
- `rezultate`: *Coming soon* Platforma [Next.js](https://nextjs.org/) pentru afisarea rezultatelor esteREAL
- `discord`: Botul de discord Ministrul Educational Alternativ
- `@real/database`: Package pentru baza de date a sistmeului
- `tsconfig`: `tsconfig.json` pentru monorepo

### Setup

1. Completare fisier .env din root cu ajutorul fisierului `.env.example` din root. (acesta este symlinked cu `packages/database`)
2. Completare fiser .env din `apps/formular` cu ajutorul fisierului `.env.example` din folder.
3. Completare fisier .env din `apps/discord` cu ajutorul fisierului `.env.example` din folder.
4. Rulare `yarn` pentru a instala dependintele.

### Develop

Pentru development se ruleaza:

```
yarn run dev
```
