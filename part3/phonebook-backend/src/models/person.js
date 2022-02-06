const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

console.log('connecting to mongodb...');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('successfully connected to mongodb'))
    .catch((err) => console.error(`error when connecting to mongodb: ${err}`));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: (v) => {
        return /^(\d\d|\d\d\d)-[0-9]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.plugin(uniqueValidator);
personSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
