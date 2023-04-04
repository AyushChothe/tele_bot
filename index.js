const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello");
});

app.listen(8080, () => {
  console.log("Hello");
});
