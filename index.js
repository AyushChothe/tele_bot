const express = require("express");
const app = express();

app.post("/", (req, res) => {
  console.log(req);
  res.send(req.body);
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Hello");
});
