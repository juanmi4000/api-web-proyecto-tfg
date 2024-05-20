/* eslint-disable */ // desactivar eslint para evitar errores de sintaxis
import fs from "node:fs";
import { randomUUID } from "node:crypto";

const usuarios = [];
for (let i = 0; i < 20; i++) {
  await fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then(({ results }) => {
      const {
        gender,
        name,
        location,
        city,
        state,
        country,
        postdate,
        email,
        login,
        picture,
        phone,
      } = results[0];
      const objeto = {
        id: randomUUID(),
        nombre: {
          nombrePila: name.first,
          apellido: name.last,
        },
        usuario: login.username,
        email: email,
        contrasena: login.password,
        telefono: phone,
        genero: gender,
        calle: {
          nombre: location.street.name,
          numero: location.street.number,
        },
        ciudad: city,
        estado: state,
        pais: country,
        codigoPostal: postdate,
        imagen: {
          grande: picture.large,
          mediana: picture.medium,
          miniatura: picture.thumbnail,
        },
      };
      usuarios.push(objeto);
    });
}

fs.writeFileSync(
  "../../src/json/usuarios.json",
  JSON.stringify(usuarios, null, 2)
);
