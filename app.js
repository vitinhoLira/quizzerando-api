const express = require('express');
const routers = require('./api');
const {sequelize} = require('./models');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/', routers)

sequelize.sync().then(()=>{

    console.log('conectado com o database');

})

const port = process.env.PORT || 3000;

app.listen(port, () => {

    console.log('App funcionando: ' + port)

});