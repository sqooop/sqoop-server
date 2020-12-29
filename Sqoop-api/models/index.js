const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
 sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
 sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Question = require('./question')(sequelize, Sequelize);
db.Activity = require('./activity')(sequelize, Sequelize);
db.QuestionCard = require('./questionCard')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.UsedHashtag = require('./usedHashtag')(sequelize, Sequelize);

// 1 : N 관계 User : Activity
db.User.hasMany(db.Activity, { onDelete: 'cascade' });
db.Activity.belongsTo(db.User);

// 1 : N 관계 User : Hashtag
db.User.hasMany(db.Hashtag, { onDelete: 'cascade' });
db.Hashtag.belongsTo(db.User);

// 1 : N 관계 Activity : QuestionCard
db.Activity.hasMany(db.QuestionCard, { onDelete: 'cascade' });
db.QuestionCard.belongsTo(db.Activity);

// 1 : N 관계 Activity : QuestionCard
db.Activity.hasMany(db.QuestionCard, { onDelete: 'cascade' });
db.QuestionCard.belongsTo(db.Activity);

// M : N 관계 Hashtag  : Activity  => UsedHashtag
db.Hashtag.belongsToMany(db.Activity, { through: 'UsedHashtag', as: 'tagged' }); // Hashtag가 봤을때 Activity는 tagged!
db.Activity.belongsToMany(db.Hashtag, { through: 'UsedHashtag', as: 'tagging' }); // Activity가 봤을때 Hashtag는 tagging!

module.exports = db;