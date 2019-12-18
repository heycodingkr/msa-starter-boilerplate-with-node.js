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

## branch rules

-   Group tokens

-   Use "grouping" tokens in front of your branch names.

-   `group1/foo`
-   `group2/foo`
-   `group1/bar`
-   `group2/bar`
-   `group3/bar`

*   The groups can be named whatever you like to match your workflow. I like to use short nouns for mine. Read on for more clarity.

*   Short well-defined tokens

*   Choose short tokens so they do not add too much noise to every one of your branch names. I use these:

*   `wip Works in progress; stuff I know won't be finished soon`
*   `feat Feature I'm adding or expanding`
*   `bug Bug fix or experiment`
*   `junk Throwaway branch created to experiment`

*   Each of these tokens can be used to tell you to which part of your workflow each branch belongs.

It sounds like you have multiple branches for different cycles of a change. I do not know what your cycles are, but let's assume they are 'new', 'testing' and 'verified'. You can name your branches with abbreviated versions of these tags, always spelled the same way, to both group them and to remind you which stage you're in.

-   `new/frabnotz`
-   `new/foo`
-   `new/bar`
-   `test/foo`
-   `test/frabnotz`
-   `ver/foo`
