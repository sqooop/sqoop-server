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
  likeActivity: async (ActivityId) => {
    try {
      const checkLike = await Activity.findOne({
        raw: true,
        attributes: ['star'],
        where: {
          id: ActivityId
        },
      });
      if (!checkLike.star) {
        const likeActivity = await Activity.update(
          { star: 1 },
          { where: { id: ActivityId } }
        )
        return '즐겨찾기 추가';
      } else {
        const unlikeActivity = await Activity.update(
          { star: 0 },
          { where: { id: ActivityId } }
        )
        return '즐겨찾기 해제';
      }

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
          as: 'tagging',
          attributes: { exclude: ['UserId'] }
        }],
      });
      const jobTag = selectedActivity.tagging.filter(tag => tag.isJob);

      return jobTag;
    } catch (err) {
      throw err;
    }
  },
  getAllActivity: async (userId) => {
    try {
      const userActivity = await Activity.findAll({
        where: {
          userId: userId
        },
        attributes: [
          'id', 'title', 'startDate', 'endDate', 'imageUrl'
        ],
        include: [{
          model: Hashtag,
          attributes: ['content', 'isJob'],

        }]
      });
      return userActivity;

    } catch (err) {
      throw err;
    }
  },
  getAllLikeActivity: async (userId) => {
    try {
      const userActivity = await Activity.findAll({
        where: {
          userId: userId,
          star: 1
        },
        attributes: [
          'id', 'title', 'startDate', 'endDate', 'imageUrl'
        ],
        include: [{
          model: Hashtag,
          attributes: ['content', 'isJob'],

        }]
      });
      return userActivity;

    } catch (err) {
      throw err;
    }
  },

}