# ui.grants [![NEAR](https://img.shields.io/badge/NEAR-%E2%8B%88-111111.svg)](https://near.org/) [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)

> Easy to set up end to end grant application form for DAOs on NEAR Protocol

## Repositories

- [ui.grants](https://github.com/NEARFoundation/ui.grants)
- [api.grants](https://github.com/NEARFoundation/api.grants)
- [admin.grants](https://github.com/NEARFoundation/admin.grants)

## Technology stack

- Blockchain: **[NEAR](https://near.org/)**
- Smart Contracts: **[Sputnik DAO Factory V2](https://github.com/near-daos/sputnik-dao-contract/tree/main/sputnikdao-factory2), [Sputnik DAO V2](https://github.com/near-daos/sputnik-dao-contract/tree/main/sputnikdao2)**
- Package manager: **[NPM](https://www.npmjs.com/)**
- Core programming language: **[TypeScript](https://www.typescriptlang.org/)**
- Application framework: **[NextJS](https://nextjs.org/)**
- Code quality: **[Eslint](https://eslint.org/), [Prettier](https://prettier.io/)**
- UI Framework: **[Mantine UI](https://mantine.dev/)**
- Internationalization: **[next-i18nnext](https://github.com/isaachinman/next-i18next)**
- Form validation: **[zod](https://github.com/colinhacks/zod)**
- HTTP client: **[Axios](https://github.com/axios/axios)**
- Query hooks: **[React Query](https://react-query.tanstack.com/)**
- Contract Signature: **[hellosign](https://github.com/HelloFax/hellosign-nodejs-sdk)**
- KYC: **[KYC DAO](https://github.com/kycdao)**
- Scheduling: **[Calendly](https://developer.calendly.com/)**

## Guides

### Configuration

```bash
cp .env.dist .env
# set up variables on .env
```

### Installation

```bash
npm install
```

Set up .env

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployment

```bash
npm install && npm run build
npm run start
```

### Testing

No tested are implemented yet.
Check the [Manual Testing](__tests__/MANUAL_TESTING.md) guide.

## Authors

- [Sandoche](https://github.com/sandoche)
