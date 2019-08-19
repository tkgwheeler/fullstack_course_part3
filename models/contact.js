const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("COnnecting to", url);

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("Error connecting to MongoDB", error.messsage);
  });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Contact", contactSchema);
