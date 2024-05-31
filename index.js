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

app.use(express.json());

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

// Create a new Perfil
// Update a Perfil
app.put("/perfil/:id", (req, res) => {
	const { nombreperfil, estado } = req.body;
	const { id } = req.params;
	const sql = "UPDATE Perfil SET nombreperfil = ?, estado = ? WHERE Idperfil = ?";
	db.run(sql, [nombreperfil, estado, id], function (err) {
		if (err) {
			return res.status(400).json({ error: err.message });
		}
		return res.json({ changes: this.changes });
	});
});

// Delete a Perfil
app.delete("/perfil/:id", (req, res) => {
	const { id } = req.params;
	const sql = "DELETE FROM Perfil WHERE Idperfil = ?";
	db.run(sql, id, function (err) {
		if (err) {
			return res.status(400).json({ error: err.message });
		}
		return res.json({ deleted: this.changes });
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
