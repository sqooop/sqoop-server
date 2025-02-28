const activityMethod = require('../method/activityMethod');
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

    if (req.files ? req.files['imageUrl'] : false) {
      imageUrl = req.files['imageUrl'][0].location;
    }
    if (req.files ? req.files['fileUrl'] : false) {
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
      ActivityId,
      imageUrl,
      fileUrl
    } = req.body;

    let imgUrl = "";
    let fUrl = "";
    let fName = "";

    if (req.files ? req.files['imageUrl'] : false) {
      imgUrl = req.files['imageUrl'][0].location;
    }
    if (req.files ? req.files['fileUrl'] : false) {
      fUrl = req.files['fileUrl'][0].location;
      fName = req.files['fileUrl'][0].originalname;
    }

    if(imageUrl) {
      imgUrl = imageUrl;
    }
    if(fileUrl) {
      fUrl = fileUrl;
    }

    console.log("imgUrl : " + imgUrl);
    console.log("fileUrl : " + fUrl);
    console.log("fileName : " + fName);

    const updatedActivity = await activityService.updateActivity(
      title,
      startDate,
      endDate,
      group,
      summary,
      jobTag,
      skillTag,
      imgUrl,
      fUrl,
      fName,
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
  },
  getRangeActivity: async (req, res) => {
    const userId = req.decoded.id;
    const {
      startDate,
      endDate,
      jobTag,
      skillTag
    } = req.query;
    const rangeActivity = await activityService.getRangeActivity(userId, startDate, endDate, jobTag, skillTag, res);
    return rangeActivity;
  },

  getActivityDate: async (req, res) => {
    const userId = req.decoded.id;
    const activityDate = await activityService.getFullDate(userId, res);
    return activityDate;
  },
  getMonthlyActivity: async (req, res) => {
    const userId = req.decoded.id;
    const { month } = req.params;
    const monthlyActivity = await activityService.getMonthlyActivity(userId, month, res);
    return monthlyActivity;
  },

  getAllIncompleteActivity: async (req, res) => {
    const UserId = req.decoded.id;
    const incompleteActivity = await activityService.getAllIncompleteActivity(UserId, res);
    return incompleteActivity;
  },
  deleteActivity: async (req, res) => {
    const {
      ActivityId
    } = req.params;
    const deletedActivity = await activityService.deleteActivity(ActivityId, res);
    return deletedActivity;

  }


}