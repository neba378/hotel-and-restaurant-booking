const db = require("./config/db");
const router = require("./routes/route");
const cors = require("cors");
const express = require("express");

const PORT = process.env.PORT || 5000;

const app = express();
db();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // Allow cookies and credentials
}));

app.use(router);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});