const myPageService = require('../service/myPageService');

module.exports = {
  getMyPage: async (req, res) => {
    const UserId = req.decoded.id;
    const myPageInfo = await myPageService.getMyPage(UserId, res);
    return myPageInfo;
  },
  updateMyPage: async (req, res) => {
    const {
      userName,
      birthday,
      phone,
      sns,
      jobBig,
      jobSmall,
      skillBig,
      skillSmall,
      introduce,
      education
    } = req.body;

    const UserId = req.decoded.id;
    let profileImg = "";

    if (req.file ? req.file : false) {
      profileImg = req.file.location;
    }

    const updatedMyPage = await myPageService.updateMyPage(
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
    );
    
    return updatedMyPage;
  }
}