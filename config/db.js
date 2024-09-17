const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb+srv://luckyvishwa1104:lucky1104@cluster0.i72lmi2.mongodb.net/myEmployee?retryWrites=true&w=majority').on('open', ()=>{console.log('MongoDB connected.');
}).on('error', ()=>{console.log('Error while connecting.');
});

module.exports = connection;