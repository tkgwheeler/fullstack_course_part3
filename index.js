const express = require("express");
const app = express();

let persons = [
  {
    name: "Billy Bob",
    number: "1224-345-543",
    id: 1
  },
  {
    name: "Juliet Lewin",
    number: "1224-123-456",
    id: 2
  },
  {
    name: "Frank the tank",
    number: "1224-746-763",
    id: 3
  }
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
