const router = require('express').Router();
const path = require("path");

router.get("/inc", (req, res) => {
	return res.send(path.join(__dirname, "inc"));
});

router.get("/", (req, res) => {
	return res.render('root', {title: 'first express app'});
});

router.get("/hello", (req, res) => {
	return res.send(req.vcount + "<br>hey there");
});

module.exports = router;