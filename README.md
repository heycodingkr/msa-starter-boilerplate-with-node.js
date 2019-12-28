# MSA node.js stater. event-driven architecture based server.

This project forked from moleculer framework which is node.js msa framework. it is modifed for creating service for me.

- Added test code for TDD. 
- Added login/signup for basic pattern of usage.

## Getting started

-   `npm install` : install npm packages
-   `npm run dev` : start dev server
-   `http://0.0.0.0:3000/graphql`: run graphql playground

## Preparing codebase as this the starter

-   `git remote add base https://github.com/heycodingkr/msa-starter-boilerplate-with-node.js.git` : add remote repository with this starter code.
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

## Architecture
From the architectural point-of-view the online store can be seen as a composition of 2 independent services: the products service and the gateway service. The first one is responsible for storage and management of the products while the second simply receives user´s requests and conveys them to the products service.

Now let’s take a look at how this hypothetical store can be created with Moleculer.

To ensure that our system is resilient to failures we will run the products and the gateway services in dedicated nodes (node-1 and node-2). If you recall, running services at dedicated nodes means that the transporter module is required for inter services communication. Most of the transporters supported by Moleculer rely on a message broker for inter services communication, so we’re going to need one up and running. Overall, the internal architecture of our store is represented in the figure below.

Now, assuming that our services are up and running, the online store can serve user’s requests. So let’s see what actually happens with a request to list all available products. First, the request (GET /products) is received by the HTTP server running at node-1. The incoming request is simply passed from the HTTP server to the gateway service that does all the processing and mapping. In this case in particular, the user´s request is mapped into a listProducts action of the products service. Next, the request is passed to the broker, which checks whether the products service is a local or a remote service. In this case, the products service is remote so the broker needs to use the transporter module to deliver the request. The transporter simply grabs the request and sends it through the communication bus. Since both nodes (node-1 and node-2) are connected to the same communication bus (message broker), the request is successfully delivered to the node-2. Upon reception, the broker of node-2 will parse the incoming request and forward it to the products service. Finally, the products service invokes the listProducts action and returns the list of all available products. The response is simply forwarded back to the end-user.
