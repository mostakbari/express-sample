const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

const rootRouter = require('./routes/root.js');
const usersRouter = require('./routes/users.js');
const numbersRouter = require('./routes/numbers.js');

const port = 9000;

app.set('view engine', "hbs");

app.use(cookieParser());
app.use("/inc", express.static(path.join(__dirname, "inc")));


app.use((req, res, next) => {
	if (req.cookies.vcount == undefined) {
		req.vcount = 1;
		res.cookie("vcount", 1);
	} else {
		req.vcount = parseInt(req.cookies.vcount) + 1;
		res.cookie("vcount", req.vcount);
	}
	next();
});

app.use('/users', usersRouter);
app.use('/numbers', numbersRouter);
app.use('/', rootRouter);




app.get("/numbers/:from-:to", (req, res) => {
	let a = parseInt(req.params.from);
	let b = parseInt(req.params.to);

	let html = "";

	if (a > b) {
		let t = a;
		a = b;
		b = t;
	}

	for (let x = a; x <= b; x++) {
		html += `<div>${x}</div>`;
	}

	res.send(html);
});

app.listen(port, function() {
	return console.log("Sample App " + port + "!");
});
