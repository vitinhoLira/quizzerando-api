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

quizz.associate = (models) => {
    quizz.hasMany(models.Pergunta, {
      foreignKey: 'quizzId', // mesmo nome usado no model Pergunta
      as: 'perguntas'
    });
  };

module.exports = quizz;