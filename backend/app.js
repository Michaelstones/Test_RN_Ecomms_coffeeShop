const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graph/schema");
const graphqlResolver = require("./graph/resolver");
const UTILS = require("./lib/utils");
const path = require("path");

// # EXPRESS::INITIALIZE APP -/
const app = express();
// Serve static images from the specified directory
app.use(
  "/images",
  express.static(path.join(__dirname, "public", "assets", "coffee_images"))
);

// # ADD MIDDLEWARE -/
app.use(cors());
// # GRAPHQL::API SERVICE -/
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    console.log("Connecting");
    app.listen(PORT);
    console.log("Connected");

    // Start the watcher
    UTILS.startWatcher();
    console.log(`🚀  GraphQL server running at port: ${PORT}`);
  } catch {
    console.log("Not able to run GraphQL server");
  }
};

start();
