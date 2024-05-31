CREATE TABLE Perfil (
	Idperfil INTEGER PRIMARY KEY,
	nombreperfil TEXT NOT NULL,
	estado TEXT
);

CREATE TABLE Usuario (
	idusuario INTEGER PRIMARY KEY,
	nombre_Usuario TEXT NOT NULL,
	contrasena TEXT NOT NULL,
	idperfil INTEGER,
	estado TEXT,
	FOREIGN KEY (idperfil) REFERENCES Perfil (Idperfil)
);

CREATE TABLE Cliente (
	Idusuario_clie INTEGER PRIMARY KEY,
	nombre1 TEXT,
	nombre2 TEXT,
	apellido1 TEXT,
	apellido2 TEXT,
	direccion TEXT,
	movil TEXT,
	correo_electronico TEXT,
	Estado TEXT,
	FOREIGN KEY (Idusuario_clie) REFERENCES Usuario (idusuario)
);