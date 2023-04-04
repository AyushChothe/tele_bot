const express = require("express");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Hello");
});
