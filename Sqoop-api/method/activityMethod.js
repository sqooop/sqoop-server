const {
  Activity, Hashtag
} = require('../models');

module.exports = {
  createActivity: async (
    title,
    startDate,
    endDate,
    group,
    summary,
    jobTag,
    skillTag,
    UserId,
    imageUrl,
    fileUrl,
    star
  ) => {
    try {
      const newActivity = await Activity.create({
        title,
        startDate,
        endDate,
        group,
        summary,
        imageUrl,
        fileUrl,
        star,
        UserId
      });

      // for(let tagId of jobTag) {
      //   await UsedHashtag.create({
      //     HashtagId: tagId,
      //     ActivityId: newActivity.id
      //   });
      // }

      // for(let tagId of skillTag) {
      //   await UsedHashtag.create({
      //     HashtagId: tagId,
      //     ActivityId: newActivity.id
      //   });
      // }

      return newActivity;
    } catch (err) {
      throw err;
    }
  },
  getActivity: async (
    ActivityId
  ) => {
    try {
      const selectedActivity = await Activity.findOne({
        where: {
          id: ActivityId
        },
        include: [{
          model: Hashtag,
          as:'tagging',
          attributes: { exclude: ['UserId'] }
        }],
      });
      const jobTag = selectedActivity.tagging.filter( tag => tag.isJob);
      
      return jobTag;
    } catch (err) {
      throw err;
    }
  }
}