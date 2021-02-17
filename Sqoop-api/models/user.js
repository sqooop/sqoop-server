module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    // 여기부터 마이페이지 정보
    profileImg: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sns: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    jobBig: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    jobSmall: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    skillBig: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    skillSmall: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    introduce: {
      type: DataTypes.TEXT(),
      allowNull: true
    },
  }, {
    freezeTableName: true,
    timestamps: false,
  });
};