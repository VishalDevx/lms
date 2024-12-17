const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    msg: " Hello I am working",
  });
});
app.listen(port, () => {
  console.log(`Your app is runnig at ${port} port`);
});
