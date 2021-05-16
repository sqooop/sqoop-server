const {
  Education,
  sequelize
} = require('../models');

let transaction;

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
      let educationArr;
      if (education) {
        educationArr = await Education.bulkCreate(education);
      }
      return "학력 수정 완료";
    } catch (err) {
      throw err;
    }
  },
}