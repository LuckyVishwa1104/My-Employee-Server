const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://localhost:27017/myEmployee').on('open', ()=>{console.log('MongoDB connected.');
}).on('error', ()=>{console.log('Error while connecting.');
});

module.exports = connection;