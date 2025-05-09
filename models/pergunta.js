const pergunta = (sequelize, DataTypes) => {

    const Pergunta = sequelize.define('Pergunta', {

        enunciado: {

            type: DataTypes.STRING

        },
        idQuiz: {

            type: DataTypes.STRING

        },
        alternativa1: {


            type: DataTypes.STRING

        },
        alternativa2: {


            type: DataTypes.STRING

        },
        alternativa3: {


            type: DataTypes.STRING

        },
        alternativa4: {


            type: DataTypes.STRING

        },
        respCorreta: {


            type: DataTypes.STRING

        },



    }, {tableName: 'pergunta'})

    return Pergunta

}

module.exports = pergunta;