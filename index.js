"use strict";
const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const fs = require("fs");
const path = require('path');

// Create the express app
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "frontend", "build")));

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    getText: String
  }

  type Mutation {
    setText(text: String): Boolean
  }
`);

function getText() {
  try {
    const data = fs.readFileSync("simple.txt", { flag: "a+" });

    return data.toString();
  } catch (error) {
    console.log(error);
  }

  return "";
}

function setText({ text }) {
  try {
    fs.writeFileSync("simple.txt", text, { flag: "a+" });

    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

// The root provides a resolver function for each API endpoint
const root = {
  getText,
  setText,
};

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Error handlers
app.use(function fourOhFourHandler(req, res) {
  res.status(404).send();
});
app.use(function fiveHundredHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send();
});

// Start server
app.listen(1234, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log("Started at http://localhost:1234");
});
