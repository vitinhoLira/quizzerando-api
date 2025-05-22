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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuario', // Nome da tabela
                key: 'id'
            }
        },
        acertos: {


            type: DataTypes.INTEGER

        },
        erros: {


            type: DataTypes.INTEGER

        },

    }, { tableName: 'resultado' });

    Resultado.associate = (models) => {
        Resultado.belongsTo(models.Quizz, {
            foreignKey: 'quizzId',
            as: 'quizz',
            onDelete: 'CASCADE'
        });

    }

    Resultado.associate = (models) => {
            Resultado.belongsTo(models.Usuario, {
                foreignKey: 'userId',
                as: 'usuario',
                onDelete: 'CASCADE'
            });
        }

    return Resultado

};

module.exports = resultado;