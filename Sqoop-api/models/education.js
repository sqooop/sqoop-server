module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Education', {
    school: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    startDate: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    endDate: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    major: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
};