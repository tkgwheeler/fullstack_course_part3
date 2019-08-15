const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Give password, Contact name and Contact number");
  process.exit(1);
}

const password = process.argv[2];
const contactName = process.argv[3];
const contactNumber = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0-abemi.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 3) {
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact);
      mongoose.connection.close();
    });
  });
} else {
  const contact = new Contact({
    name: contactName,
    number: contactNumber
  });

  contact.save().then(response => {
    console.log("Contact saved!");
    console.log(response);
    mongoose.connection.close();
  });
}
