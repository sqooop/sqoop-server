const {
  History,
  sequelize
} = require('../models');

module.exports = {
  deleteAllHistory: async (UserId) => {
    try {
      await History.destroy({
        where: {
          UserId
        }
      });

      return "이력사항 삭제 완료";
    } catch (err) {
      throw err;
    }
  },
  updateLangHistory: async (langHistory) => {
    try {
      let langHistoryArr;
      if (langHistory) {
        langHistoryArr = await History.bulkCreate(langHistory);
      }
      return "이력사항[어학] 수정 완료";
    } catch (err) {
      throw err;
    }
  },
  updateCertificateHistory: async (certificateHistory) => {
    try {
      let certificateHistoryArr;
      if (certificateHistory) {
        certificateHistoryArr = await History.bulkCreate(certificateHistory);
      }
      return "이력사항[자격증] 수정 완료";
    } catch (err) {
      throw err;
    }
  },
  updateAwardHistory: async (awardHistory) => {
    try {
      let awardHistoryArr;
      if (awardHistory) {
        awardHistoryArr = await History.bulkCreate(awardHistory);
      }
      return "이력사항[수상 내역] 수정 완료";
    } catch (err) {
      throw err;
    }
  },
}