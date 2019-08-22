const router = require('express').Router();

const articleRoutes = require("./articles");
const scrapeRoutes = require("./scrape");

router.use("/articles", articleRoutes);
router.use("/scrape", scrapeRoutes);

module.exports = router;