var db = require("../../models");
var axios = require("axios");
var cheerio = require("cheerio");
const router = require("express").Router();

router.post("/", (req, res)=>{
	axios.get("https://articles.edhrec.com").then(function(response) {
  
		var $ = cheerio.load(response.data);
		$("h3.blog-post-title").each(function(i, element) {
			var result = [];

			var title = $(element).children().text();
			var link = $(element).children().attr("href");
			var summary = $(element).parent().children().text();
			result.push({
				title: title,
				link: link,
				summary: summary
			});
			console.log(result);
			db.Article.create(result)
				.then(function(dbArticle) {
					console.log(dbArticle);
				})
				.catch(function(err) {
					res.redirect("/")
				});
		});
		res.redirect("/")
	});
})

module.exports = router;
