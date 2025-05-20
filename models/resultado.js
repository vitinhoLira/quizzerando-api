const resultado = (sequelize, DataTypes) => {

    const Resultado = sequelize.define('Resultado', {

        pontuacao: {

            type: DataTypes.INTEGER

        },
        quizzId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quizz', // Nome da tabela
                key: 'id'
            }
        },
        acertos: {


            type: DataTypes.INTEGER

        },
        erros: {


            type: DataTypes.INTEGER

        },

    }, {tableName: 'resultado'});

    Resultado.associate = (models) => {
        Pergunta.belongsTo(models.Quizz, {
            foreignKey: 'quizzId',
            as: 'quizz',
            onDelete: 'CASCADE'
        });
    };

    return Resultado

}

module.exports = resultado;