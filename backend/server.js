const db = require("./config/db");
const router = require("./routes/route");
const cors = require("cors");
const express = require("express");

const PORT = process.env.PORT || 8000;

const app = express();
db();
app.use(express.json());

app.use(
  cors({
    origin: "https://capable-hummingbird-077a25.netlify.app",
    credentials: true,
  })
);

app.use(router);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});