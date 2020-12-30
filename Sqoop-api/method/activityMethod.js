const {
  Activity, UsedHashtag
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

      console.log(jobTag);
      console.log(skillTag);

      for(let tagId of jobTag) {
        await UsedHashtag.create({
          HashtagId: tagId,
          ActivityId: newActivity.id
        });
      }

      for(let tagId of skillTag) {
        await UsedHashtag.create({
          HashtagId: tagId,
          ActivityId: newActivity.id
        });
      }

      return newActivity;
    } catch (err) {
      throw err;
    }
  }
}