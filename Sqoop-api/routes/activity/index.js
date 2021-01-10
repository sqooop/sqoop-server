const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');
const activityController = require('../../controller/activityController');

const twoFieldUpload = upload.fields([{
  name: "imageUrl",
  maxCount: 1
}, {
  name: "fileUrl",
  maxCount: 1
}]);

router.get('/getOneActivity/:ActivityId', activityController.getActivity); // ⚡
router.post('/create', twoFieldUpload, activityController.createActivity); // ⚡
router.put('/update/', twoFieldUpload, activityController.updateActivity); // ⚡
router.get('/getAllActivity', activityController.getAllActivity); // ⚡
router.put('/likeActivity/:ActivityId', activityController.likeActivity);
router.get('/getLikeActivity', activityController.getAllLikeActivity); // ⚡
router.get('/getRangeActivity', activityController.getRangeActivity);
router.get('/getActivityDate', activityController.getActivityDate);
router.get('/:month/getMonthlyActivity', activityController.getMonthlyActivity);

module.exports = router;