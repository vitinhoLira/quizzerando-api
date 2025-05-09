const pergunta = (sequelize, DataTypes) => {

    const Pergunta = sequelize.define('Pergunta', {

        enunciado: {

            type: DataTypes.STRING

        },
        quizzId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quizz', // Nome da tabela
                key: 'id'
            }
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



    }, {tableName: 'pergunta'});

    Pergunta.associate = (models) => {
        Pergunta.belongsTo(models.Quizz, {
            foreignKey: 'quizzId',
            as: 'quizz',
            onDelete: 'CASCADE'
        });
    };

    return Pergunta

}

module.exports = pergunta;