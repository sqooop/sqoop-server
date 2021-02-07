const {
  Education, sequelize
} = require('../models');

let transaction;

module.exports = {
  // deleteAllEducation: async (UserId) => {
  //   try {
  //     transaction = await sequelize.transaction();
  //     await Education.destroy({
  //       where: {
  //         UserId
  //       },
  //       transaction
  //     });
  //     await transaction.commit();

  //     return "학력 삭제 완료";
  //   } catch (err) {
  //     if(transaction) await transaction.rollback();
  //     throw err;
  //   }
  // },
  updateEducation: async (UserId ,education) => {
    try {
      transaction = await sequelize.transaction();

      await Education.destroy({
        where: {
          UserId
        },
        transaction
      });

      let educationArr;
      if(education) {
        educationArr = await Education.bulkCreate(education, {
          transaction
        });
      }
      await transaction.commit();

      return educationArr;
    } catch (err) {
      if (transaction) await transaction.rollback();
      throw err;
    }
  },
}