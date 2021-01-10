const {
  Activity,
  Hashtag
} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
        const likeActivity = await Activity.update({
          star: 1
        }, {
          where: {
            id: ActivityId
          }
        })
        return '즐겨찾기 추가';
      } else {
        const unlikeActivity = await Activity.update({
          star: 0
        }, {
          where: {
            id: ActivityId
          }
        })
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
        order: [
          ['startDate', 'ASC']
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
        order: [
          ['startDate', 'ASC']
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
  getPreRangeActivity: async (userId, startDate, endDate, jobTag, skillTag) => {
    try {
      const preRangeActivity = await Activity.findAll({
        where: {
          UserId: userId,
          [Op.and]: [{
              startDate: {
                [Op.gte]: startDate
              }
            },
            {
              endDate: {
                [Op.lte]: endDate
              }
            },
          ]
        },
        attributes: ['id'],
        include: [{
          model: Hashtag,
          where: {
            [Op.or]: [{
                [Op.and]: [{
                  isJob: 1
                }, {
                  content: {
                    [Op.in]: jobTag
                  }
                }]
              },
              {
                [Op.and]: [{
                  isJob: 0
                }, {
                  content: {
                    [Op.in]: skillTag
                  }
                }]
              }
            ]
          }
        }]
      });
      return preRangeActivity;

    } catch (err) {
      throw err;
    }
  },
  getPreDateRangeActivity: async (userId, startDate, endDate) => {
    try {

      const preRangeActivity = await Activity.findAll({
        where: {
          UserId: userId,
          [Op.and]: [{
              startDate: {
                [Op.gte]: startDate
              }
            },
            {
              endDate: {
                [Op.lte]: endDate
              }
            },
          ]
        },
        attributes: ['id']
      });

      return preRangeActivity;

    } catch (err) {
      throw err;
    }
  },
  getPreSkillRangeActivity: async (userId, startDate, endDate, skillTag) => {
    try {
      const preRangeActivity = await Activity.findAll({
        where: {
          UserId: userId,
          [Op.and]: [{
              startDate: {
                [Op.gte]: startDate
              }
            },
            {
              endDate: {
                [Op.lte]: endDate
              }
            },
          ]
        },
        attributes: ['id'],
        include: [{
          model: Hashtag,
          where: {
            [Op.or]: [{
              [Op.and]: [{
                isJob: 0
              }, {
                content: {
                  [Op.in]: skillTag
                }
              }]
            }]
          }
        }]
      });
      return preRangeActivity;

    } catch (err) {
      throw err;
    }
  },
  getPreJobRangeActivity: async (userId, startDate, endDate, jobTag) => {
    try {
      const preRangeActivity = await Activity.findAll({
        where: {
          UserId: userId,
          [Op.and]: [{
              startDate: {
                [Op.gte]: startDate
              }
            },
            {
              endDate: {
                [Op.lte]: endDate
              }
            },
          ]
        },
        attributes: ['id'],
        include: [{
          model: Hashtag,
          where: {
            [Op.or]: [{
              [Op.and]: [{
                isJob: 1
              }, {
                content: {
                  [Op.in]: jobTag
                }
              }]
            }]
          }
        }]
      });
      return preRangeActivity;

    } catch (err) {
      throw err;
    }
  },
  getRangeActivity: async (rangeActivityId) => {
    try {
      const userActivity = await Activity.findAll({
        where: {
          id: {
            [Op.in]: rangeActivityId
          }
        },
        attributes: [
          'id', 'title', 'startDate', 'endDate', 'imageUrl'
        ],
        order: [
          ['startDate', 'ASC']
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

  getActivityDate: async (UserId) => {
    try {
      const activityDate = await Activity.findAll({
        where: {
          UserId
        },
        raw: true,
        attributes: ['startDate', 'endDate']
      });
      return activityDate;
    } catch (err) {
      throw err;
    }
  },
  getMonthlyActivity: async (userId, endDateComparement, startDateComparement) => {
    try {
      const monthlyActivity = await Activity.findAll({
        where: {
          UserId: userId,
          [Op.and]: [
            { startDate: { [Op.lte]: startDateComparement } },
            { endDate: { [Op.gte]: endDateComparement } },
          ]
        },
        attributes: [
          'id', 'title', 'startDate', 'endDate', 'imageUrl'
        ],
        order: [
          ['startDate', 'ASC']
        ],
        include: [{
          model: Hashtag,
          attributes: ['content', 'isJob'],
          }]
      });

      return monthlyActivity;

    } catch (err) {
      throw err;
    }
  },

  getAllIncompleteActivity: async (incompleteList, UserId) => {
    try {
      const incompleteActivity = await Activity.findAll({
        order: ['startDate'],
        where: {
          UserId,
          id: {
            [Op.in]: incompleteList
          },
        include: [{
          model: Hashtag,
          attributes: ['content', 'isJob'],
        }]
      });
      return incompleteActivity;
    } catch (err) {
      throw err;
    }
  },
  deleteActivity: async (ActivityId) => {
    try {
      await Activity.destroy({
        where: {
          id: ActivityId
        }
      });
      return "활동 삭제 완료";
    } catch (err) {
      throw err;
    }
  }
 }