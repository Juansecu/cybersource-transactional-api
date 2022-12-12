# Cybersource Transactional API

## Description

A RESTful API for sending and receiving payment transactions through CyberSource API.

**Note:** This API makes requests to the CyberSource REST API through HTTP Signature method.

<span style="color: red;">Important:</span> Do not use this API for production purposes. This API is for testing purposes only.

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
  - bcrypt
  - class-transformer
  - class-validator
  - crypto
  - jsonwebtoken
  - reflect-metadata
  - rimraf
  - rxjs
  - sqlite3
  - typeorm
  - uuid

- ### Environment Variables

  Needs the following environment variables:

  - **CRYPTO_SECRET_KEY** - The key used to encrypt and decrypt the data.
  - **CYBERSOURCE_HOST** - The host of the Cybersource API.
  - **DATABASE_NAME** - The name of the database to use.
  - **JWT_SECRET** - The secret used to sign and verify JWT tokens.
  - **MERCHANT_ID** - The merchant ID used to authenticate with Cybersource.
  - **MERCHANT_KEY_ID** - The merchant key id used to authenticate the merchant.
  - **MERCHANT_SECRET_KEY** - The merchant secret key used to authenticate the merchant.

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

## Endpoints

- ### /users
  - **/login** - POST - Authenticate a user.
  - **/register** - POST - Register a new user.

## Default data

Default data is inserted into the database when the application starts by the first time. For more information, see the `.migration.ts` files inside the `src/**/migrations` folders.
