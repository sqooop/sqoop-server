const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const userMethod = require('../method/userMethod');
const educationMethod = require('../method/educationMethod');

module.exports = {
  getMyPage: async (UserId, res) => {
    try {
      const myPageInfo = await userMethod.getMyPage(UserId);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_MY_PAGE_SUCCESS, myPageInfo));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.GET_MY_PAGE_FAIL));
    }
  },
  updateMyPage: async (
    UserId,
    userName,
    profileImg,
    birthday,
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
      const updatedMyPage = await userMethod.updateMyPage(
        UserId,
        userName,
        profileImg,
        birthday,
        phone,
        sns,
        jobBig,
        jobSmall,
        skillBig,
        skillSmall,
        introduce
      );

      // await educationMethod.deleteAllEducation(UserId);

      if(education) {
        for(let idx in education) {
          education[idx].UserId = UserId;
        }
      }
      await educationMethod.updateEducation(UserId, education);

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_MY_PAGE_SUCCESS, updatedMyPage));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_MY_PAGE_FAIL));
    }
  },
  testEducation: async (UserId, education, res) => {
   try {
    if(education) {
      for(let idx in education) {
        education[idx].UserId = UserId;
      }
    }
    const updatedEducation = await educationMethod.updateEducation(UserId, education);

    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.UPDATE_MY_PAGE_SUCCESS, updatedEducation));

   } catch(err) {
    console.error(err);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.UPDATE_MY_PAGE_FAIL));
   }
  }
}