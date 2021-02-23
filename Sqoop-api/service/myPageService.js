const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const userMethod = require('../method/userMethod');
const educationMethod = require('../method/educationMethod');
const historyMethod = require('../method/historyMethod');
const {
  sequelize
} = require('../models');
let transaction;

module.exports = {
  getMyPage: async (UserId, res) => {
    try {
      transaction = await sequelize.transaction();
      let myPageInfo = await userMethod.getMyPage(UserId, transaction);
      const tempMyPageInfo = myPageInfo.History.map(data => data.get({
        plain: true
      }));

      const langHistory = tempMyPageInfo.filter(data => data.type == 1);
      const certificateHistory = tempMyPageInfo.filter(data => data.type == 2);
      const awardHistory = tempMyPageInfo.filter(data => data.type == 3);

      myPageInfo = myPageInfo.get({
        plain: true
      });
      delete myPageInfo.History;

      myPageInfo.LangHistory = langHistory;
      myPageInfo.CertificateHistory = certificateHistory;
      myPageInfo.AwardHistory = awardHistory;

      transaction.commit();

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_MY_PAGE_SUCCESS, myPageInfo));
    } catch (err) {
      console.error(err);
      if (transaction) await transaction.rollback();
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_MY_PAGE_FAIL));
    }
  },
  updateMyPage: async (
    UserId,
    profileEmail,
    profileImg,
    phone,
    sns,
    jobBig,
    jobSmall,
    skillBig,
    skillSmall,
    introduce,
    education,
    langHistory,
    certificateHistory,
    awardHistory,
    res
  ) => {
    try {
      if (!profileEmail || !phone || !sns || !jobBig || !jobSmall || !skillBig || !skillSmall || !introduce) {
        console.log('필요값 누락');
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
      }

      transaction = await sequelize.transaction();
      const updatedMyPage = await userMethod.updateMyPage(
        UserId,
        profileEmail,
        profileImg,
        phone,
        sns,
        jobBig,
        jobSmall,
        skillBig,
        skillSmall,
        introduce,
        transaction
      );

      const deletedAllEducation = await educationMethod.deleteAllEducation(UserId, transaction);
      console.log(deletedAllEducation);

      if (education) {
        for (let idx in education) {
          education[idx].UserId = UserId;
        }
      }
      const updatedEducation = await educationMethod.updateEducation(education, transaction);
      console.log(updatedEducation);

      const deletedAllHistory = await historyMethod.deleteAllHistory(UserId, transaction);
      console.log(deletedAllHistory);

      if (langHistory) {
        for (let idx in langHistory) {
          if (!langHistory[idx].title &&
            !langHistory[idx].date &&
            !langHistory[idx].testName &&
            !langHistory[idx].score) {
            throw "[LangHistory] All NULL ERROR!" 
          }
          langHistory[idx].UserId = UserId;
          langHistory[idx].type = 1;
        }
      }
      const updatedLangHistory = await historyMethod.updateLangHistory(langHistory, transaction);
      console.log(updatedLangHistory);

      if (certificateHistory) {
        for (let idx in certificateHistory) {
          if (!certificateHistory[idx].title &&
            !certificateHistory[idx].date &&
            !certificateHistory[idx].testName &&
            !certificateHistory[idx].score) {
            throw "[CertificateHistory] All NULL ERROR!" 
          }
          certificateHistory[idx].UserId = UserId;
          certificateHistory[idx].type = 2;
        }
      }
      const updatedCertificateHistory = await historyMethod.updateCertificateHistory(certificateHistory, transaction);
      console.log(updatedCertificateHistory);

      if (awardHistory) {
        for (let idx in awardHistory) {
          if (!awardHistory[idx].title &&
            !awardHistory[idx].date &&
            !awardHistory[idx].testName &&
            !awardHistory[idx].score) {
            throw "[AwardHistory] All NULL ERROR!" 
          }
          awardHistory[idx].UserId = UserId;
          awardHistory[idx].type = 3;
        }
      }
      const updatedAwardHistory = await historyMethod.updateAwardHistory(awardHistory, transaction);
      console.log(updatedAwardHistory);

      await transaction.commit();

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_MY_PAGE_SUCCESS, updatedMyPage));
    } catch (err) {
      console.error(err);
      if (transaction) await transaction.rollback();
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_MY_PAGE_FAIL));
    }
  },
  // testEducation: async (UserId, education, res) => {
  //   try {
  //     transaction = await sequelize.transaction();
  //     await educationMethod.deleteAllEducation(UserId, transaction);
  //     if (education) {
  //       for (let idx in education) {
  //         education[idx].UserId = UserId;
  //       }
  //     }
  //     const updatedEducation = await educationMethod.updateEducation(education, transaction);
  //     await transaction.commit();

  //     return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_MY_PAGE_SUCCESS, updatedEducation));
  //   } catch (err) {
  //     console.error(err);
  //     if (transaction) await transaction.rollback();
  //     return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_MY_PAGE_FAIL));
  //   }
  // }
}