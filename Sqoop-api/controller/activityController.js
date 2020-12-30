const activityService = require('../service/activityService');

module.exports = {
  createActivity: async (req, res) => {
    const {
      title,
      startDate,
      endDate,
      group,
      summary,
      jobTag,
      skillTag
    } = req.body;

    let imageUrl = "";
    let fileUrl = "";

    if (req.files['imageUrl']) {
      imageUrl = req.files['imageUrl'][0].location;
    }
    if (req.files['fileUrl']) {
      fileUrl = req.files['fileUrl'][0].location;
    }

    const UserId = req.decoded.id;
    const newActivity = await activityService.createActivity(
      title,
      startDate,
      endDate,
      group,
      summary,
      jobTag,
      skillTag,
      imageUrl,
      fileUrl,
      UserId,
      res
    );

    return newActivity;
  }
}