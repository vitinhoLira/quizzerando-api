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

    }, {tableName: 'quizz'});

    Quizz.associate = (models) => {
        Quizz.hasMany(models.Pergunta, {
            foreignKey: 'quizzId', // mesmo nome usado no model Pergunta
            as: 'perguntas',
            onDelete: 'CASCADE',
            hooks: true
        });

        Quizz.hasOne(models.Resultado, {
            foreignKey: 'quizzId', // mesmo nome usado no model Resultado
            as: 'resultado',
            onDelete: 'CASCADE',
            hooks: true
        });

    };

    return Quizz

};

module.exports = quizz;