const express = require('express');
const router = express.Router();
const {checkJwt} = require('../middlewares/jwt_auth.middleware');
const userRegister = require('../middlewares/user_maneger.middleware');
const deviceRegister = require('../middlewares/device_maneger.middleware');
const { join } = require("path");


router.use(checkJwt);
router.get('/admin', (req,res)=>{
    res.sendFile(join(__dirname,'../views/private/groups.html'));
})
router.post('/user/register', userRegister);
router.post('/device/register', deviceRegister);

module.exports = router;