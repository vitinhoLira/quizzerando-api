const usuario = (sequelize, DataTypes) => {

  const Usuario = sequelize.define('Usuario', {

    nome: {

      type: DataTypes.STRING

    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('usuario', 'admin'),
      defaultValue: 'usuario'
    },

  }, { tableName: 'usuario' });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Resultado, {
      foreignKey: 'userId', // mesmo nome usado no model Pergunta
      as: 'resultado',
      onDelete: 'CASCADE',
      hooks: true
    });

  }

  return Usuario

};

module.exports = usuario;
