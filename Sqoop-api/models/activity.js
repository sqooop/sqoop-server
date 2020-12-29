module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Activity', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    group: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    summary: {
      type: DataTypes.STRING(60), 
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    fileUrl: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    star : {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
};