module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Question', {
    content: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    guide: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

  }, {
    freezeTableName: true,
    timestamps: false
  });
};