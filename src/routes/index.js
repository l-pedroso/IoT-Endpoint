const express = require('express');
const router = express.Router();
const {checkJwt} = require('../middlewares/jwt');
const addUser = require('../middlewares/user');
const addDevice = require('../middlewares/device');
const { route } = require('./public');
const errors = require('../utils/error/error');


router.use(checkJwt);
router.post('/user/add', addUser);
router.post('/device/add', addDevice);

router.use(function (err, req, res, next) {
    if(err instanceof errors){
      res.status(500).send('user not found!');
      console.log(err.stack);
    }else{
      console.error(err.message);
      res.status(500).send('Something broke!')
    }
    
  })

module.exports = router;