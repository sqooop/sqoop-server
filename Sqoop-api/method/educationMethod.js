const {
  Education
} = require('../models');

module.exports = {
  deleteAllEducation: async (UserId) => {
    try {
      await Education.destroy({
        where: {
          UserId
        }
      });
      return "학력 삭제 완료";
    } catch (err) {
      throw err;
    }
  },
  updateEducation: async (education) => {
    try {
      const educationArr = await Education.bulkCreate(education);
      return educationArr;
    } catch (err) {
      throw err;
    }
  },
}