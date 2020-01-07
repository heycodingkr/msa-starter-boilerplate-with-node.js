# MSA node.js stater. event-driven architecture based server.

This project forked from moleculer framework which is node.js msa framework. it is modifed for creating service for me.

- Added test code for TDD. 
- Added login/signup for basic pattern of usage.

## Getting started

-   `npm install` : install npm packages
-   `npm run dev` : start dev server
-   `http://0.0.0.0:3000/graphql`: run graphql playground

## Preparing codebase as this the starter

-   `git remote add base https://github.com/heycodingkr/msa-starter-boilerplate-with-node.js.git` : add remote repository with this codebase.
-   `git pull base master` : pull the code as master in local branch.

## NPM scripts

-   `docker-compose up -d nats`: Start nats as transporter (optional, if you setup nats as default transporter when you created a project)
-   `docker-compose up -d mongo`: Start mongo db with docker.
-   `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
-   `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
-   `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
-   `npm run lint`: Run ESLint
-   `npm run ci`: Run continuous test mode with watching
-   `npm test`: Run tests & generate coverage report
-   `npm run dc:up`: Start the stack with Docker Compose
-   `npm run dc:down`: Stop the stack with Docker Compose

## install jest globally

-   `npm install -g jest` intall jest to use jest cmd globally.

## references

-   [[Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)
-   [JEST](https://jestjs.io/)
-   [Apollo-GraphQL](https://github.com/moleculerjs/moleculer-apollo-server)
-   [Graphql-tool](https://github.com/apollographql/graphql-tools)

## Core Concepts
This guide covers the core concepts of any Moleculer application.

## Service
A service is a simple JavaScript module containing some part of a complex application. It is isolated and self-contained, meaning that even if it goes offline or crashes the remaining services would be unaffected.

## Node
A node is a simple OS process running on a local or external network. A single instance of a node can host one or many services.

## Local Services
Two (or more) services running on a single node are considered local services. They share hardware resources and use local bus to communicate with each other, no network latency (transporter is not used).

## Remote Services
Services distributed across multiple nodes are considered remote. In this case, the communication is done via transporter.

Service Broker
Service Broker is the heart of Moleculer. It is responsible for management and communication between services (local and remote). Each node must have an instance of Service Broker.

## Transporter
Transporter is a communication bus that services use to exchange messages. It transfers events, requests and responses.

## Gateway
API Gateway exposes Moleculer services to end-users. The gateway is a regular Moleculer service running a (HTTP, WebSockets, etc.) server. It handles the incoming requests, maps them into service calls, and then returns appropriate responses.

## Overall View
There’s nothing better than an example to see how all these concepts fit together. So let’s consider a hypothetical online store that only lists its products. It doesn’t actually sell anything online.


