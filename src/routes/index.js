const express = require('express');
const router = express.Router();
const {checkJwt} = require('../middlewares/jwt');
const addUser = require('../middlewares/user');
const addDevice = require('../middlewares/device');
const {userErrorHandler} = require('../middlewares/errorHandler');
const errors = require('../utils/error/baseError');

router.use(checkJwt);
router.post('/user/add', addUser);
router.post('/device/add', addDevice);
router.use(userErrorHandler, function (err, req, res, next) {
  res.status(500).json({ERROR:err.message});
});

module.exports = router;