const {
  History,
  sequelize
} = require('../models');

module.exports = {
  deleteAllHistory: async (UserId, transaction) => {
    try {
      await History.destroy({
        where: {
          UserId
        },
        transaction
      });

      return "이력사항 삭제 완료";
    } catch (err) {
      throw err;
    }
  },
  updateLangHistory: async (langHistory, transaction) => {
    try {
      let langHistoryArr;
      if (langHistory) {
        langHistoryArr = await History.bulkCreate(langHistory, {
          transaction
        });
      }
      return "이력사항[어학] 수정 완료";
    } catch (err) {
      throw err;
    }
  },
  updateCertificateHistory: async (certificateHistory, transaction) => {
    try {
      let certificateHistoryArr;
      if (certificateHistory) {
        certificateHistoryArr = await History.bulkCreate(certificateHistory, {
          transaction
        });
      }
      return "이력사항[자격증] 수정 완료";
    } catch (err) {
      throw err;
    }
  },
  updateAwardHistory: async (awardHistory, transaction) => {
    try {
      let awardHistoryArr;
      if (awardHistory) {
        awardHistoryArr = await History.bulkCreate(awardHistory, {
          transaction
        });
      }
      return "이력사항[수상 내역] 수정 완료";
    } catch (err) {
      throw err;
    }
  },
}