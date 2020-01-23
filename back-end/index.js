const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/controllers/tools')(app);
app.listen(3000, () => {
    console.log('Server ON - Port: 3000')
})