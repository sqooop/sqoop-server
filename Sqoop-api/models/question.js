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
  }, {
    freezeTableName: true,
    timestamps: false
  });
};