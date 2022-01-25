const Joi = require("joi");
const express = require("express");
const searchRoute = require("./src/api/controllers/search");
const clearCacheRoute = require("./src/api/controllers/clear-cache");
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", searchRoute);
app.use("/api", clearCacheRoute);

app.get("/_health", (req, res) => {
  res.send("Ok");
});

app.listen(port, () => {
  console.log(`App listining on port ${port}`);
});
