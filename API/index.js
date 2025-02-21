const express = require("express");
const sequelize = require("./db/instance");
const cors = require('cors');
const app = express();
app.use(express.json());

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
app.use("/api/people", require("./routes/people.routes"));
