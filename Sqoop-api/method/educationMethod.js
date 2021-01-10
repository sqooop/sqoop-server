const { Education } = require('../models');

module.exports = {
    updateEducation: async (UserId, education) => {
        try {
            await Education.destroy({
              where: {
                UserId
              }
            });
            const educationArr = await Education.bulkCreate(education);
            return educationArr;
        } catch (err) {
            throw err;
        }
    }
}