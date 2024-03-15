const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());

const messageForm = require("./Routes/form");

app.use(messageForm);

app.all("*", function (req, res) {
  res.json({ message: "Page not found" });
});

app.listen(3000, () => {
  console.log("server has started");
});
