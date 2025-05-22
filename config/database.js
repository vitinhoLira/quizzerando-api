require('dotenv').config();

module.exports = {

    dialect: 'postgres',
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // },
    host: "localhost",
    port: 5436,
    database: "quizzerando",
    username: "postgres",
    password: "teste"

}
