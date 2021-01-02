const { Hashtag } = require('../models');

module.exports = {
    createHashtag: async (hashtagList) => {
        try {
            //hashtagList : actId,content,isJob
            const newHashtag = await Hashtag.bulkCreate(
                hashtagList
            );
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