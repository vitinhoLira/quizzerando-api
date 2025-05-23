require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const serverless = require('serverless-http');
const routers = require('./api');
const {sequelize} = require('./models');

const app = express();


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json());

app.use('/', routers);





sequelize.sync().then(()=>{

    console.log('conectado com o database');

})

const port = process.env.PORT || 3001;

app.listen(port, () => {

    console.log('App funcionando: ' + port)

});

// module.exports = serverless(app);