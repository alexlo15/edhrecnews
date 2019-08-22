const router = require("express").Router();
var db = require("../../models");

router.get("/", function(req, res) {
	db.Article.find({})
		.then(function(art) {
			var articlesObj = {
				articles: art
			};
			res.render("index", articlesObj);
		})
		.catch(function(err) {
			res.json(err);
		});
})

router.get("/saved", (req, res)=>{
	db.Article.find({"saved":"true"})
	.then(function(art) {
		var articlesObj = {
			articles: art
		};
		res.render("saved", articlesObj);
	})
	.catch(function(err) {
		res.json(err);
	});
})

module.exports = router;
