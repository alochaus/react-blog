const dotenv = require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/api/user', require('./api/routes/users.js'));
app.use('/api/entries', require('./api/routes/entries.js'));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
