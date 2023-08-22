# Health Service 🩺​​😷

Diagnostics for MemeIt project

## Team

* Nam Anh Nguyen *(Teamlead)*
* Pierre Fabarius
* Anton Quietzsch

## Production URL

http://cl-svc-242.ris.beuth-hochschule.de:5000

## Table of Contents

* [🐳 Docker](#%F0%9F%90%B3-docker) 
  * [Workflow](#workflow) 
    * [Local development](#local-development)
    * [Local development w/ other services](#local-development-w/-other-services) 
      * [Via Docker Container](#via-docker-container)
      * [Via Prism](#via-prism)
  * [🚀 Push/Publish](#%F0%9F%9A%80-push/publish)
* [🛣 Environment Variables](#%F0%9F%9B%A3-environment-variables)
* [📅 CHANGELOG](#%F0%9F%93%85-changelog) 
  * [final](#final)
  * [v1.5.4](#v1.5.4)
  * [v1.5.3](#v1.5.3)
  * [v1.5.2](#v1.5.2)
  * [v1.5.1](#v1.5.1)
  * [v1.5.0](#v1.5.0)
  * [v1.4.1](#v1.4.1)
  * [v1.4.0](#v1.4.0)
  * [v1.3.7](#v1.3.7)
  * [v1.3.6](#v1.3.6)
  * [v1.3.5](#v1.3.5)
  * [v1.3.4](#v1.3.4)
  * [v1.3.3](#v1.3.3)
  * [v1.3.2](#v1.3.2)
  * [v1.3.1](#v1.3.1)
  * [v1.3.0](#v1.3.0)
  * [v1.2.0](#v1.2.0)
  * [v1.1.1](#v1.1.1)
  * [v1.1.0](#v1.1.0)
  * [v1.0.0](#v1.0.0)

## 🐳 Docker

### Workflow

#### Local development

Run `npm run docker:build` in order to build image from current project directory

Run `npm run docker:run` in order to run container from built image ran by cmd before

#### Local development w/ other services

##### Via Docker Container

Run `docker pull -t <docker-image-from-other-service>` to retrieve from service which you want to run locally

Run `docker run -t <docker-image-from-other-service>` to run service image in container

CAUTION: make sure you are setting env-vars using -e flag if required. (docker run -e STORAGE_SERVICE_URL=https://<path-to-url>)

##### Via Prism

Run `npm run mock:<storage | user | index | frontend>` to run mock server on related port determined in `package.json`

Now you can make calls to the related server-url (`localhost:<port-in-package.json>`) w/ your chosen http client.

### 🚀 Push/Publish

Run `npm run docker:login` in order to login in beuth gitlab container registry

Run `npm run docker:build` in order to build image from current project directory, which you want to push into the registry (make sure all unit & lint tests are resolved)

Run `npm run docker:push` in order to push built image to the container registry (checkout `package.json` to see which image gets pushed)

## 🛣 Environment variables

* `STORAGE_SERVICE_URL` - default: http://cl-svc-245.ris.beuth-hochschule.de:3000/
* `USER_SERVICE_URL` - default: http://cl-svc-249.ris.beuth-hochschule.de:3000/
* `INDEX_SERVICE_URL` - default: http://cl-svc-246.ris.beuth-hochschule.de:3000/
* `FRONTEND_SERVICE_URL` - default: https://frontend-service.api.datexis.com/

## 📅 CHANGELOG

### [final](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/final)

* removed unused `husky` package dependency

### [v1.5.4](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.5.4)

Fix

* added 10s timeout to storage call `/data`

### [v1.5.3](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.5.3)

Fix

* code documentation & clean up
* swagger.yaml fix, updated from 1.1.2 -> `1.1.3`

### [v1.5.2](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.5.2)

Fix

* bug that causes timeouts on endpoint `/health/data`

### [v1.5.1](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.5.1)

Implementation

* replaced mock data response w/ storage, frontend & user data for `GET /v1/health/data` route
* updated swagger.yaml from 1.1.1 -> `1.1.2`

### [v1.5.0](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.5.0)

Fix & Implementation

* `entity structure` of LogObj & Info (typeORM), enabling proper `orderBy & pagination` together

### [v1.4.1](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.4.1)

Fix

* documentation of parameters of `GET /logs endpoint` in `swagger.yaml` & sorted logs by timestamp
* updated `swagger.yaml` from 1.1.0 -> `1.1.1`
* added `https://frontend-service.api.datexis.com` url to validation of `requestedUrl` field

### [v1.4.0](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.4.0)

Implementation

* `paging` for `POST /log endpoint` (returning PaginatedLogsResponse)
* updated `swagger.yaml` from 1.0.6 -> `1.1.0`
* refined `validation` via `pipe` of `GET /logs endpoint`

### [v1.3.7](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.3.7)

Change

* `deleted local sqlite file`, fixing mounting of local data to production sqlite file
* added `.dockerignore`

### [v1.3.6](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.3.6)

Implementation

* `Logging` for /log, /logs & /service endpoints Fix
* fixed `statuCode` check in `POST /v1/health/log`

### [v1.3.5](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.3.5)

Fix & Update

* fixed `httpMethod & statusCode` check in `POST /v1/health/log`
* updated `POST /v1/health/log` in `swagger.yaml` w/ status codes & examples

### [v1.3.4](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.3.4)

Update

* added `HEALTH` enum to `ServiceName schema` in `swagger.yaml` & to service-name.model.ts

### [v1.3.3](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.3.3)

Implementation

* e2e tests (api-tests) & CI/CD integration Fix
* POST route `/v1/health/log` - error handling: check logObj.info

### v1.3.2

Fix

* POST route `/v1/health/log` - error handling: check logObj.info

### [v1.3.1](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.3.1)

Implementation

* POST route `/v1/health/log` - error handling when passing request body

### [v1.3.0](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/v1.3.0)

Implementation

* GET route `/v1/health/data` with example data

### [v1.2.0](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/release%2Fv1.2.0)

Implementation

* GET route `/v1/health/services`

### [v1.1.1](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/release%2Fv1.1.1)

Implementation

* CI/CD build & unit-test stage
* prism mocks (for local development)

Fix

* database path in TypeORMModule
* refactored Dockerfile for less image size & faster deploy

### [v1.1.0](https://gitlab.beuth-hochschule.de/microservice-seminar-ws20-21/health-service/-/tags/release%2Fv1.1.0)

Implementation

* POST route `/v1/health/log`
* GET route `/v1/health/logs`
* SQLite DB

Contract

* updated to version 1.0.1
* removed data property in POST Call
* updated contract w/ production url

### v1.0.0

* basic scaffold
* homepage returns basic string