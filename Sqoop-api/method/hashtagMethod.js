const { Hashtag } = require('../models');

module.exports = {
    createHashtag: async (content, UserId, isJob) => {
        try {
            const newHashtag = await Hashtag.create({
                content,
                UserId,
                isJob
            });
            return newHashtag;
        } catch (err) {
            throw err;
        }
    },
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