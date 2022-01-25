const express = require("express");
const router = express.Router();
const { searchSchemaValidator } = require("../../helpers/search.valdiations");
const { getCachedSearchResult } = require("../services/search");

router.post("/search", async (req, res) => {
  const { isValid, message } = searchSchemaValidator(req.body);
  if (!isValid) {
    res.status(400).json({ message });
  }
  const { items: cachedItems } = await getCachedSearchResult(
    req.body.searchType,
    req.body.searchText
  );
  res.status(200).json({ data: cachedItems });
});

module.exports = router;
