const {
  Education,
  sequelize
} = require('../models');

let transaction;

module.exports = {
  deleteAllEducation: async (UserId, transaction) => {
    try {
      await Education.destroy({
        where: {
          UserId
        },
        transaction
      });

      return "학력 삭제 완료";
    } catch (err) {
      throw err;
    }
  },
  updateEducation: async (education, transaction) => {
    try {
      let educationArr;
      if (education) {
        educationArr = await Education.bulkCreate(education, {
          transaction
        });
      }
      return "학력 수정 완료";
    } catch (err) {
      throw err;
    }
  },
}