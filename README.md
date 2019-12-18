# Sming server starter

this project forked from moleculer framework which is node.js msa framework. it is modifed for creating service.

## Getting started

-   `npm install` : install npm packages
-   `npm run dev` : start dev server

## NPM scripts

-   `docker-compose up -d nats`: Start nats as transporter (optional, if you setup nats as default transporter when you created a project)
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

-   [![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)
-   [JEST](https://jestjs.io/)
-   [async test snippets](https://jestjs.io/docs/en/asynchronous)
