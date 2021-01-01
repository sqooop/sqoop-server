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

router.get('/:ActivityId', activityController.getActivity);
router.post('/create', twoFieldUpload, activityController.createActivity);

module.exports = router;