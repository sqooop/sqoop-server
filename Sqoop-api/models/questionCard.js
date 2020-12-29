module.exports = (sequelize, DataTypes) => {
  return sequelize.define('QuestionCard', {
    number: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    question: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT(),
      allowNull: true
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });
};