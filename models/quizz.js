const quizz = (sequelize, DataTypes) => {

    const Quizz = sequelize.define('Quizz', {

        titulo: {

            type: DataTypes.STRING

        },
        descricao: {

            type: DataTypes.STRING

        },
        categoria: {


            type: DataTypes.STRING

        },
        idUsuario: {


            type: DataTypes.STRING

        },
        ativo: {


            type: DataTypes.BOOLEAN

        },

    }, {tableName: 'quizz'})

    return Quizz

}

module.exports = quizz;