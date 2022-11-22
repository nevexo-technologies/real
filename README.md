# Registrul Educational Alternativ

## Continut

Monorepo-ul REAL se foloseste de [yarn](https://yarnpkg.com) pentru package management. Include urmatoarele:

### Apps and Packages

- `formular`: Formularele pentru elevi, profesori si parinti. [README.md](apps/formular/README.md)
- `rezultate`: Platforma pentru afisarea rezultatelor formularului. [README.md](apps/rezultate/README.md)
- `discord`: Botul de discord Ministrul Educational Alternativ. [README.md](packages/discord/README.md)
- `@real/database`: Package pentru baza de date a sistmeului.
- `config`: Configuratia ESLint.
- `tsconfig`: Configuratia Typescript.

### Setup

1. Completare fisier .env din root cu ajutorul fisierului `.env.example` din root. (acesta este symlinked cu `packages/database`)
2. Completare fiser .env din `apps/formular` cu ajutorul fisierului `.env.example` din folder.
3. Completare fisier .env din `apps/discord` cu ajutorul fisierului `.env.example` din folder.
4. Rulare `yarn` pentru a instala dependintele.

### Development

Pentru development se ruleaza:

```
yarn run dev
```