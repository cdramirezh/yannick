const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

let db = new sqlite3.Database("./db.sqlite", err => {
	if (err) {
		console.error(err.message);
	}
	console.log("Connected to the SQLite database.");
});

app.get("/users", (req, res) => {
	const sql = "SELECT * FROM Usuario";
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get("/profile", (req, res) => {
	const sql = "SELECT * FROM Perfil";
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get("/customer", (req, res) => {
	const sql = "SELECT * FROM Cliente";
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
