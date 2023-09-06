const mongoose = require('mongoose');

const db = 'mongodb+srv://arpandas020498:lKSREfJlmnnaP2IL@cluster0.hlq0cta.mongodb.net/INotebook?retryWrites=true&w=majority';

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = mongoose;
