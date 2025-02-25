const db = require("./config/db");
const router = require("./routes/route");
const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();
db();
app.use(express.json());

app.use(router);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});