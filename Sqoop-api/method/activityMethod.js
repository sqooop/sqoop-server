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
    fileName,
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
        fileName,
        star,
        UserId
      });

      return newActivity;
    } catch (err) {
      throw err;
    }
  },
  updateActivity: async (
    title,
    startDate,
    endDate,
    group,
    summary,
    imageUrl,
    fileUrl,
    fileName,
    ActivityId
  ) => {
    try {
      const updatedActivity = await Activity.update({
        title,
        startDate,
        endDate,
        group,
        summary,
        imageUrl,
        fileUrl,
        fileName,
      }, {
        where: {
          id: ActivityId
        }
      });

      return "활동 정보 수정 완료";
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
      });

      return selectedActivity;
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