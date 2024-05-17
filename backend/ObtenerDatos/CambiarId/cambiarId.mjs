import animes from "./animes-copy.json" assert { type: "json" };
import fs from "node:fs";

animes.forEach((anime) => {
  anime.id = crypto.randomUUID();
});

fs.writeFileSync("./backend/animes-1.json", JSON.stringify(animes, null, 2));

console.log(animes[0].id);
