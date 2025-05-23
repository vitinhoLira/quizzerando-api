require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const serverless = require('serverless-http');
const routers = require('./api');
const {sequelize} = require('./models');

const app = express();

app.use(express.json());

app.use('/', routers);

app.use(cors());

sequelize.sync().then(()=>{

    console.log('conectado com o database');

})

const port = process.env.PORT || 3000;

app.listen(port, () => {

    console.log('App funcionando: ' + port)

});

// module.exports = serverless(app);