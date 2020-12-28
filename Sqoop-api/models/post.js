module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Post', {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    contents: {
      type: DataTypes.TEXT(), // 장문의 글이 들어갈 때는 TEXT사용!
      allowNull: false
    },
    postImageUrl: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: true
  });
};