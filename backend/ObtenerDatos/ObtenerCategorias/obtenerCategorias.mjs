import { json } from "express";
import animes from "../../animes.json" assert { type: "json" };
import fs from "node:fs";

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
  "../../categorias.json",
  JSON.stringify(jsonCategorias, null, 2)
);

// categorias.forEach((categoria) => console.log(categoria));
