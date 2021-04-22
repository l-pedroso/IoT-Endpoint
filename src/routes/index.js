const express = require('express');
const router = express.Router();
const {checkJwt} = require('../middlewares/jwt_auth.middleware');
const userRegister = require('../middlewares/user_maneger.middleware');
const deviceRegister = require('../middlewares/device_maneger.middleware');
const { join } = require("path");


router.use(checkJwt);

router.post('/user/register', userRegister);
router.post('/device/register', deviceRegister);


// Serve the index page for all other requests
router.get("/private/devices", (_, res) => {
    res.sendFile(join(__dirname, "../views/private/devices/devices.html"));
  });

module.exports = router;