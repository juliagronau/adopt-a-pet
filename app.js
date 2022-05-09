import express from "express";
import pets from "./helper.js";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(
    `<h1>Adopt a Pet!</h1><p>Browse through the links below to find your new furry friend:</p>
    <ul>
        <li><a href="/animals/dogs">Dogs</a></li>
        <li><a href="/animals/cats">Cats</a></li>
        <li><a href="/animals/rabbits">Rabbits</a></li>
    </ul>`
  );
});

app.get("/animals/:pet_type", (req, res) => {
  const { pet_type } = req.params;
  let html = "";
  pets[pet_type].map(
    (pet, index) =>
      (html += `<li><a href="/animals/${pet_type}/${index}">${pet.name}</a></li>`)
  );
  res.send(`<h1>List of ${pet_type}</h1><ul>${html}</ul>`);
});

app.get("/animals/:pet_type/:pet_id", (req, res) => {
  const pet = pets[req.params.pet_type][req.params.pet_id];
  res.send(`
    <h1>Name: ${pet.name}</h1>
    <img src="${pet.url}" alt="${pet.name}" />
    <p>Description: ${pet.description}</p>
    <ul>
      <li>Age: ${pet.age}</li>
      <li>Breed: ${pet.breed}</li>
    </ul>
  `);
});

app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);
