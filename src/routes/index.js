const express = require('express');
const router = express.Router();
const {checkJwt} = require('../middlewares/jwt_auth.middleware');
const userRegister = require('../middlewares/user_maneger.middleware');
const deviceRegister = require('../middlewares/device_maneger.middleware');


router.use(checkJwt);

router.post('/user/register', userRegister);
router.post('/device/register', deviceRegister);

module.exports = router;