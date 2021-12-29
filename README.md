# Cybersource Transactional API

## Description

A RESTful API for sending and receiving payment transactions.

## Requirements

- ### Engine

  - Node.js version 10.13.0 and above

- ### Dependencies

  Needs the following dependencies:

  - @nestjs/common
  - @nestjs/config
  - @nestjs/core
  - @nestjs/platform-express
  - @nestjs/typeorm
  - reflect-metadata
  - rimraf
  - rxjs
  - sqlite3
  - typeorm

- ### Environment Variables

  - **DATABASE_NAME** - The name of the database to use.

## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
