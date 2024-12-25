<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Pulsifi Assessment API built using NestJS.<br/>NestJS A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p> <p align="center"> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>


## Description

This project implements a search-flight API endpoint using the SkyScanner API from RapidAPI. It is built with NestJS and provides the following functionalities:

- Search for roundtrip flight information based on user-specified date ranges.
- Sort results from cheapest to most expensive.
- Return the result as JSON.

### available commit type

- build: Use this type when making changes to your build system, like updating dependencies or changing configurations.
- chore: Use this type when making changes to your codebase that don't modify the application or the test suite, like updating documentation or cleaning up code.
- ci: Use this type when making changes to your continuous integration pipeline, like updating build scripts or adding new tests.
- docs: Use this type when making changes to your documentation, like updating README files or adding new comments in your code.
- feat: Use this type when adding new features to your application or extending existing features.
- fix: Use this type when fixing bugs in your code or resolving issues in your application.
- perf: Use this type when making performance improvements to your application, like optimizing algorithms or improving memory usage.
- refactor: Use this type when refactoring your codebase, like improving code readability or simplifying complex code.
- revert: Use this type when reverting a previous commit or a series of commits.
- style: Use this type when making stylistic changes to your code, like updating formatting or adding missing semicolons.
- test: Use this type when adding new tests to your application or modifying existing tests.

## Installation

```bash
$ npm install
```

## Set up environment variables: Create a .env file in the root directory (also shared in email)

```bash
$ PORT=3000
$ RAPID_API_URL=https://sky-scanner3.p.rapidapi.com
$ RAPID_API_KEY=your_rapidapi_key
$ JWT_SECRET=your_jwt_secret
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The API will run on http://localhost:3000.
Swagger: http://localhost:3000/pulsifi-assessment/api#/

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

