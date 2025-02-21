import express, { json } from "express";
import sequelize from "./db/instance.js";
import cors from 'cors';
import { graphqlHTTP } from "express-graphql";
import schema from './graphql/schema.js';
import rootValue from './graphql/root.js';
import router from "./routes/people.routes.js";
const app = express();
app.use(json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});

try {
  sequelize.authenticate();
  console.log("Connection stablished succesfully.");
} catch (e) {
  console.error("Unable to connect to database: ", e);
}

app.use(cors({origin: 'http://localhost:5173'}));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);
app.use("/api/people", router);
