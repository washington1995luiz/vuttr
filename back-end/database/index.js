const mongoose = require('mongoose');

const uri = 'mongodb://localhost/vuttr';
mongoose.connect(uri,{useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true, useFindAndModify: false });
mongoose.Promise = global.Promise;

module.exports = mongoose;