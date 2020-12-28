const express = require('express');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');

router.get('/', (req, res) => {
  res.status(200).send("User Page");
})

module.exports = router;