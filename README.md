# Neo4j Builder

A Neo4j graph database editor. Explore your **neo4j** graph, create and edit nodes and relationships.

Based on [neo4j-js-ng2](https://github.com/adadgio/neo4j-js-ng2) by Romain Bruckert.

![Demo gif 01](https://github.com/KeatsPeeks/neo4j-builder/blob/develop/src/assets/tutos/neo4j-js-tuto-01-low.gif)

![Demo gif 02](https://github.com/KeatsPeeks/neo4j-builder/blob/develop/src/assets/tutos/neo4j-js-tuto-02-low.gif)

![Demo gif 03](https://github.com/KeatsPeeks/neo4j-builder/blob/develop/src/assets/tutos/neo4j-js-tuto-03-low.gif)

## Getting started

- Clone or download the project
- Copy `src/assets/neo4j.settings.json.dist` to `src/assets/neo4j.settings.json`.
- Run `ng serve` or `npm start`.

### Pre-requisites

- Neo4j must be installed [Neo4j quick install instructions here](https://www.digitalocean.com/community/tutorials/how-to-install-neo4j-on-an-ubuntu-vps)
- Neo4j Basic Authentication must have been configured (by default)
- Angular2 CLI is required for running with `ng serve` or building into the `dist` folder.

### Quick configuration

- With Angular2: serve project with `ng serve`and navigate to `http://localhost:4200/`
- Without Angular2: create a virtual host on your machine and point it to the `dist` folder
- Copy `src/assets/neo4j.settings.json.dist` to `src/assets/neo4j.settings.json` and change with your settings
- Change client `authBasic` value to `Basic: <authString>`. Auth string is a **base64 encode** `username:password`

*Note:* various settings like node colors and default labels are customizable in the JSON or on the fly!

## Simple queries

Simple queries let you pop nodes on the graph very quickly without writing cypher queries. Simple queries are types in the main exploration search bar.

*Why use this instead of cypher queries?* Because it's a little bit more complicated to allow any alias such as `MATCH (myAlias) RETURN myAlias`, but that's coming in the future. Besides, for exploration, simple queries are faster user-end wise.

**Examples**

```
// simple query pseudo code format
:Label1:Label2 property="Value" limit,skip

// numbers, limit and multiple properties (AND...)
:Person name="Ben" age=12 10

// limit and skip
:Person name="Ben" age=34 50,0

// queery and show 1st level relationships (+1 flag)
:Company name="Gougle" +1
```

## Running in production

Clone the repository and point an Apache2 or Nginx virtual host to the `./dist` folder (see `./support` files for examples).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
