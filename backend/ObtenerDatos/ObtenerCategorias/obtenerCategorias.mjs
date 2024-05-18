import fs from "node:fs";

// leer un JSON lo recomendado
import { createRequire } from "node:module";
const require = createRequire(import.meta.url); // tiene la dirección del archivo actual
const animes = require("../../animes.json");

let categorias = [];

animes.forEach(({ generos }) => {
  let encontrado;
  generos.forEach((genero) => {
    encontrado = categorias.find((categoria) => categoria == genero);
    if (!encontrado) {
      categorias.push(genero);
    }
  });
});

let jsonCategorias = [];

categorias.forEach((categoria) => {
  jsonCategorias.push({
    id: crypto.randomUUID(),
    nombre: categoria,
  });
});
fs.writeFileSync(
  "../../categorias-copia.json",
  JSON.stringify(jsonCategorias, null, 2)
);

// categorias.forEach((categoria) => console.log(categoria));
