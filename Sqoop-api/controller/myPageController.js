const myPageService = require('../service/myPageService');

module.exports = {
  getMyPage: async (req, res) => {
    const UserId = req.decoded.id;
    const myPageInfo = await myPageService.getMyPage(UserId, res);
    return myPageInfo;
  }
}