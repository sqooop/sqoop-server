const myPageService = require('../service/myPageService');

module.exports = {
  getMyPage: async (req, res) => {
    const UserId = req.decoded.id;
    const myPageInfo = await myPageService.getMyPage(UserId, res);
    return myPageInfo;
  },
  updateMyPage: async (req, res) => {
    const {
      profileEmail,
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
      profileImg
    } = req.body;

    const UserId = req.decoded.id;
    let imgUrl = "";

    if (req.file ? req.file : false) {
      imgUrl = req.file.location;
    }

    if(profileImg) {
      imgUrl = profileImg;
    }

    const updatedMyPage = await myPageService.updateMyPage(
      UserId,
      profileEmail,
      imgUrl,
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
    );
    
    return updatedMyPage;
  },
}