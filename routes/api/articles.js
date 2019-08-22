const router = require('express').Router();
var db = require("../../models");

// our homepage that finds all articles
router.get("/", (req, res) => {
	db.Article.find({})
		.then(function (articles) {
			res.json(articles);
		})
		//The error handling
		.catch(function (err) {
			res.json(err);
		});
})

// route to delete articles
router.post("/delall", (req, res) => {
	db.Article.remove().then(function (articles) {
			res.redirect("/")
		})
		.catch(function (err) {
			res.json(err);
		});
})

// 
router.get("/:id", (req, res) => {
	db.Article.findOne({
			_id: req.params.id
		})
		.populate("note")
		.then(function (articles) {
			res.json(articles);
		})
		.catch(function (err) {
			res.json(err);
		});
})

router.post("/saved/:id", (req, res) => {
	db.Article.update(req.body)
		.then(function (data) {
			return db.Article.findOneAndUpdate({
				_id: req.params.id
			}, {
				$set: {
					saved: req.body.saved
				}
			});
		})
		.then(function (article) {
			res.json(article);
		})
		.catch(function (err) {
			res.json(err);
		});
})

router.post("/new/:id", (req, res)=>{
	db.Note.create(req.body)
	.then(function (newNote) {
		return db.Article.findOneAndUpdate({
			_id: req.params.id
		}, {
			$set: {
				note: newNote._id
			}
		});
	})
	.then(function (article) {
		res.json(article);
	})
	.catch(function (err) {
		res.json(err);
	});
})

module.exports = router;

