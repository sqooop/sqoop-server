module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Hashtag', {
    content: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    isJob: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
};