require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/contact");

app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :data-sent",
    {
      skip: function(req, res) {
        return req.method !== "POST";
      }
    }
  )
);

morgan.token("data-sent", function(req, res) {
  return JSON.stringify(req.body);
});

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

app.get("/info", (request, response) => {
  let personsLength = persons.length;
  let date = new Date();
  response.send(
    `<p>Phonebook has info for ${personsLength} People</p><p>${date}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts.map(contact => contact.toJSON()));
  });
});

app.get("/api/persons/:id", (request, response) => {
  Contact.findById(request.params.id).then(contact => {
    response.json(contact.toJSON());
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const id = Math.floor(Math.random() * Math.floor(100000));
  return id;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  // - Error handle for missing Name/Number and whether Name is unique
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Missing name or number"
    });
  } else if (persons.findIndex(person => person.name === body.name) !== -1) {
    return response.status(400).json({
      error: "Name already exists"
    });
  }

  const person = new Contact({
    name: body.name,
    number: body.number,
    id: generateId()
  });

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON());
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
