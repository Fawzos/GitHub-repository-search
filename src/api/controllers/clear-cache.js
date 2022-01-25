const express = require("express");
const router = express.Router();

router.post("/clear-cache", (req, res) => {
  res.send("Ok");
});

module.exports = router;
