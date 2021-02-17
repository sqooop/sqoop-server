const {
    Hashtag, sequelize
} = require('../models');
let transaction;

module.exports = {
    createHashtag: async (hashtagList) => {
        try {
            transaction = await sequelize.transaction();
            //hashtagList : actId,content,isJob
            const newHashtag = await Hashtag.bulkCreate(hashtagList, {
                transaction
            });
            await transaction.commit();

            return newHashtag;
        } catch (err) {
            if(transaction) await transaction.rollback();
            throw err;
        }
    },

    getHashtag: async (ActivityIdList) => {
        try {
            const userHashtag = Hashtag.findAll({
                raw: true,
                where: {
                    ActivityId: ActivityIdList
                },
                attributes: [
                    'content', 'isJob'
                ]
            })
            return userHashtag;
        } catch (err) {
            throw err;
        }
    },


    getJobTag: async (ActivityId) => {
        try {
            const selectedJobTag = await Hashtag.findAll({
                where: {
                    ActivityId,
                    isJob: 1
                }
            });
            return selectedJobTag;
        } catch (err) {
            throw err;
        }
    },
    getSkillTag: async (ActivityId) => {
        try {
            const selectedSkillTag = await Hashtag.findAll({
                where: {
                    ActivityId,
                    isJob: 0
                },
                attributes: ['content', 'isJob']
            });
            return selectedSkillTag;
        } catch (err) {
            throw err;
        }
    },
    deleteHashtag: async (ActivityId) => {
        try {
            transaction = await sequelize.transaction();
            const deleted = await Hashtag.destroy({
                where: {
                    ActivityId
                },
                transaction
            });
            await transaction.commit();

            return deleted;
        } catch (err) {
            if(transaction) await transaction.rollback();
            throw err;
        }

    }
    // getUsedHashtag: async (ActivityId) => {
    //     try {
    //         const usedHashtag = await UsedHashtag.findAll({
    //             where: {
    //                 ActivityId
    //             },
    //             attributes: ['HashtagId'],
    //             include: [{
    //                 model: Hashtag,
    //                 attributes: ['isJob', 'content']
    //             }]
    //         });
    //         return usedHashtag;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

}