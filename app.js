const express = require('express');
const routers = require('./api');
const {sequelize} = require('./models');

const app = express();

app.use(express.json());

app.use('/', routers)

sequelize.sync().then(()=>{

    console.log('conectado com o database');

})

app.listen(process.env.PORT, () => {

    console.log('App funcionando: ' + process.env.PORT)

});