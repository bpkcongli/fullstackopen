const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js ' +
    '<password>');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://bpkcongli:${password}@cluster0.yluov.mongodb.net/phonebooks-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const name = process.argv[3];
const number = process.argv[4];

if (name && number) {
  const person = new Person({
    name,
    number,
  });

  person.save()
      .then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
        process.exit(1);
      });
} else {
  Person.find({})
      .then((persons) => {
        const result = persons
            .reduce((p, c) => p + `\n${c.name} ${c.number}`, '');
        console.log(`phonebook:${result}`);
        mongoose.connection.close();
        process.exit(1);
      });
}

