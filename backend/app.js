const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
//styles
app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", routes);

app.listen(port);