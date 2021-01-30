const upload = require('../modules/multer');
var profileUpload = upload.single('profileImg');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const util = require('../modules/util');

const fileSizeFilter = {
  sizeFilter: async (req, res, next) => {
    upload.limits = {
      fileSize: 1024 * 1024
    };
    profileUpload(req, res, (err) => {
      delete upload.limits;
      if (err) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.OUT_OF_SIZE));
      }
      next();
    });
  }
}

module.exports = fileSizeFilter;