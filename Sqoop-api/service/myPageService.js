const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const userMethod = require('../method/userMethod');
const educationMethod = require('../method/educationMethod');
const {
  sequelize
} = require('../models');
let transaction;

module.exports = {
  getMyPage: async (UserId, res) => {
    try {
      transaction = await sequelize.transaction();
      let myPageInfo = await userMethod.getMyPage(UserId, transaction);
      if(myPageInfo.profileEmail == null) {
        await userMethod.updateMyPage(
          myPageInfo.id,
          myPageInfo.email,
          myPageInfo.profileImg,
          myPageInfo.phone,
          myPageInfo.sns,
          myPageInfo.jobBig,
          myPageInfo.jobSmall,
          myPageInfo.skillBig,
          myPageInfo.skillSmall,
          myPageInfo.introduce,
          transaction);
          myPageInfo = await userMethod.getMyPage(UserId, transaction);
      }
      transaction.commit();
      
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_MY_PAGE_SUCCESS, myPageInfo));
    } catch (err) {
      console.error(err);
      if(transaction) await transaction.rollback();
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
      await educationMethod.deleteAllEducation(UserId, transaction);
      if (education) {
        for (let idx in education) {
          education[idx].UserId = UserId;
        }
      }
      const updatedEducation = await educationMethod.updateEducation(education, transaction);
      
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