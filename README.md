# Connector API - NestJS

This (coding challenge) API implements the Connector API tag-route for TrendMiner integration.

## Prepare

- rename `.env.sample` to `.env` and fill in values for basic authentication
- install dependencies
  ```bash
  $ npm install
  ```

## Running the API

```bash
# development server: http://localhost:3000
$ npm run start
```

See OpenAPI specification (Swagger) for responses and tag-schema:

- Run API development server
- Goto http://localhost:3000/api


## Tests

```bash
# unit tests
$ npm run test

# unit test coverage
$ npm run test:cov
```

## Q&A

__How to integrate my data?__
The actual data integration, e.g. per querying your database, has to be done in the _tags.service_.

__What has been implemented already?__
The `GET /api/v2/tags` http endpoint (according to the TrendMiner docs), including basic authentication and basic error handling, has been implemented.
Tests and the OpenAPI specification provide further insights.

__What will be necessary to get it production-ready?__

- integrate your data in the tags.service handler
- build API
- deploy with TLS
