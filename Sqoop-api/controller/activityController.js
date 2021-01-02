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
    let fileName = "";

    if (req.files['imageUrl']) {
      imageUrl = req.files['imageUrl'][0].location;
    }
    if (req.files['fileUrl']) {
      fileUrl = req.files['fileUrl'][0].location;
      fileName = req.files['fileUrl'][0].originalname;
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
      fileName,
      UserId,
      res
    );

    return newActivity;
  },
  updateActivity: async (req, res) => {
    const {
      title,
      startDate,
      endDate,
      group,
      summary,
      jobTag,
      skillTag,
      contents,
      questions,
      ActivityId
    } = req.body;

    let imageUrl = "";
    let fileUrl = "";
    let fileName = "";

    if (req.files['imageUrl']) {
      imageUrl = req.files['imageUrl'][0].location;
    }
    if (req.files['fileUrl']) {
      fileUrl = req.files['fileUrl'][0].location;
      fileName = req.files['fileUrl'][0].originalname;
    }

    const updatedActivity = await activityService.updateActivity(
      title,
      startDate,
      endDate,
      group,
      summary,
      jobTag,
      skillTag,
      imageUrl,
      fileUrl,
      fileName,
      ActivityId,
      questions,
      contents,
      res
    );

    return updatedActivity;
  },
  likeActivity: async (req, res) => {
    const {
      ActivityId
    } = req.params;
    const likeActivity = await activityService.likeActivity(ActivityId, res);

    return likeActivity;
  },
  getActivity: async (req, res) => {
    const {
      ActivityId
    } = req.params;
    const selectedActivity = await activityService.getActivity(ActivityId, res);

    return selectedActivity;
  },
  getAllActivity: async (req, res) => {

    const userId = req.decoded.id;
    const allActivity = await activityService.getAllActivity(userId, res);
    return allActivity;
  },
  getAllLikeActivity: async (req, res) => {
    const userId = req.decoded.id;
    const allLikeActivity = await activityService.getAllLikeActivity(userId, res);
    return allLikeActivity;
  }
}