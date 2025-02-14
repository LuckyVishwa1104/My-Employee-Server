const mongoose = require('mongoose');

// mongodb://localhost:27017/myEmployee - connection string for local database
// mongodb+srv://luckyvishwa1104:lucky1104@cluster0.i72lmi2.mongodb.net/myEmployee?retryWrites=true&w=majority - connection string for remote database

const connection = mongoose.createConnection('mongodb+srv://luckyvishwa1104:lucky1104@cluster0.i72lmi2.mongodb.net/myEmployee?retryWrites=true&w=majority').on('open', ()=>{console.log('MongoDB connected.');
}).on('error', ()=>{console.log('Error while connecting.');
});

module.exports = connection;