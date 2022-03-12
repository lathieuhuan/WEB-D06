const express = require("express");
const router = express.Router();

const mangas = [
  { id: 1, name: "Naruto", copies: 304200 },
  { id: 2, name: "Conan", copies: 338279 },
  { id: 3, name: "Doraemon", copies: 323329 },
  { id: 4, name: "Fairy Tales", copies: 348383 },
];

router.get("/", (req, res) => {
  res.send(mangas);
});

router.post("/", (req, res) => {
  const newManga = {
    id: mangas.length + 1,
    name: req.body.name,
    copies: req.body.copies,
  };
  mangas.push(newManga);
  res.send(mangas);
});

module.exports = router;
