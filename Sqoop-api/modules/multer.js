const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const myBucket = require('./myBucket').bucket;
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3,
        bucket: myBucket,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE, // 이렇게하면 다운로드가 그냥 창이 뜨게!
        key: function (req, file, cb) {
            console.log("original : " + file.originalname);
            console.log("split original : " + file.originalname.split('.').pop());

            cb(null, 'images/origin/' + Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
        }
    }),
    // limits: { fileSize: 5 * 1024 * 1024 }, // 파일 제한 5메가
});
module.exports = upload;