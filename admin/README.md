# admin.grants [![NEAR](https://img.shields.io/badge/NEAR-%E2%8B%88-111111.svg)](https://near.org/) [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)

> Easy to set up end to end grant application form for DAOs on NEAR Protocol

## Repositories

- [ui.grants](https://github.com/NEARFoundation/ui.grants)
- [api.grants](https://github.com/NEARFoundation/api.grants)
- [admin.grants](https://github.com/NEARFoundation/admin.grants)

## Technology stack

- Package manager: **[NPM](https://www.npmjs.com/)**
- Application framework: **[ExpressJS](https://expressjs.com/)**
- Code quality: **[Eslint](https://eslint.org/), [Prettier](https://prettier.io/)**
- Database: **[MongoDB](https://www.mongodb.com/)**
- Admin Panel: **[AdminJS](https://adminjs.com/)**

## Guides

### Configuration

```bash
cp .env.dist .env
# 1. set up variables on .env
```

### Installation

```bash
npm install
```

Set up .env

### Development

```bash
# run mongodb
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

### Deployment

```bash
npm install
npm start
```

### Testing

No tests are implemented yet.

## Authors

- [Sandoche](https://github.com/sandoche)
