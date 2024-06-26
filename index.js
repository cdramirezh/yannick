const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3000;

let db = new sqlite3.Database("./db.sqlite", err => {
	if (err) {
		console.error(err.message);
	}
	console.log("Connected to the SQLite database.");
});

app.use(express.json());
app.use(cors());

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
app.post("/perfil", (req, res) => {
	const { Idperfil, nombreperfil, estado } = req.body;
	const sql = "INSERT INTO Perfil (Idperfil, nombreperfil, estado) VALUES (?, ?, ?)";
	db.run(sql, [Idperfil, nombreperfil, estado], function (err) {
		if (err) {
			return res.status(400).json({ error: err.message });
		}
		return res.json({ id: this.lastID });
	});
});

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

// Create a new Usuario
app.post("/user", (req, res) => {
	const { idusuario, nombre_Usuario, contrasena, idperfil, estado } = req.body;
	const sql =
		"INSERT INTO Usuario (idusuario, nombre_Usuario, contrasena, idperfil, estado) VALUES (?, ?, ?, ?, ?)";
	db.run(sql, [idusuario, nombre_Usuario, contrasena, idperfil, estado], function (err) {
		if (err) {
			return res.status(400).json({ error: err.message });
		}
		return res.json({ id: this.lastID });
	});
});

// Update a Usuario
app.put("/user/:id", (req, res) => {
	const { nombre_Usuario, contrasena, idperfil, estado } = req.body;
	const { id } = req.params;
	const sql =
		"UPDATE Usuario SET nombre_Usuario = ?, contrasena = ?, idperfil = ?, estado = ? WHERE idusuario = ?";
	db.run(sql, [nombre_Usuario, contrasena, idperfil, estado, id], function (err) {
		if (err) {
			return res.status(400).json({ error: err.message });
		}
		return res.json({ changes: this.changes });
	});
});

// Delete a Usuario
app.delete("/user/:id", (req, res) => {
	const { id } = req.params;
	const sql = "DELETE FROM Usuario WHERE idusuario = ?";
	db.run(sql, id, function (err) {
		if (err) {
			return res.status(400).json({ error: err.message });
		}
		return res.json({ deleted: this.changes });
	});
});

// Create a new Cliente
app.post("/cliente", (req, res) => {
	const {
		Idusuario_clie,
		nombre1,
		nombre2,
		apellido1,
		apellido2,
		direccion,
		movil,
		correo_electronico,
		Estado,
	} = req.body;
	const sql =
		"INSERT INTO Cliente (Idusuario_clie, nombre1, nombre2, apellido1, apellido2, direccion, movil, correo_electronico, Estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
	db.run(
		sql,
		[
			Idusuario_clie,
			nombre1,
			nombre2,
			apellido1,
			apellido2,
			direccion,
			movil,
			correo_electronico,
			Estado,
		],
		function (err) {
			if (err) {
				return res.status(400).json({ error: err.message });
			}
			return res.json({ id: this.lastID });
		}
	);
});

// Update a Cliente
app.put("/cliente/:id", (req, res) => {
	const { nombre1, nombre2, apellido1, apellido2, direccion, movil, correo_electronico, Estado } =
		req.body;
	const { id } = req.params;
	const sql =
		"UPDATE Cliente SET nombre1 = ?, nombre2 = ?, apellido1 = ?, apellido2 = ?, direccion = ?, movil = ?, correo_electronico = ?, Estado = ? WHERE Idusuario_clie = ?";
	db.run(
		sql,
		[nombre1, nombre2, apellido1, apellido2, direccion, movil, correo_electronico, Estado, id],
		function (err) {
			if (err) {
				return res.status(400).json({ error: err.message });
			}
			return res.json({ changes: this.changes });
		}
	);
});

// Delete a Cliente
app.delete("/cliente/:id", (req, res) => {
	const { id } = req.params;
	const sql = "DELETE FROM Cliente WHERE Idusuario_clie = ?";
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
