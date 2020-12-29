const { Hashtag, Activity } =  require('./index');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('UsedHashtag', {
    HashtagId: {
      type: DataTypes.INTEGER,
      reference: {
        model: Hashtag,
        key: 'id'
      }
    },
    ActivityId: {
      type: DataTypes.INTEGER,
      reference: {
        model: Activity,
        key: 'id'
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
}