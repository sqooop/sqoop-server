module.exports = (sequelize, DataTypes) => {
  return sequelize.define('History', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    date: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    testName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER, 
      allowNull: true
    },
    // type
    // 1: 어학
    // 2: 자격증
    // 3: 수상내역
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });
};