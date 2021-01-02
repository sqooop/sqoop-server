const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'sopt-27-osj',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            console.log("original : " + file.originalname);
            console.log("split original : " + file.originalname.split('.').pop());

            cb(null, 'images/origin/' + Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
            // file.originalname.split('.').pop() -> 이 구문은 파일의 확장자만 따온 것!!
        }
    })
});
module.exports = upload;