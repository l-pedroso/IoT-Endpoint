const express = require('express');
const router = express.Router();
const {checkJwt, checkScopes} = require('../middlewares/JWT_Auth');
const userRegister = require('../controllers/userManeger');


router.use(checkJwt);

  // This route doesn't need authentication
router.get('/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

router.get('/register', userRegister);


router.get('/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

module.exports = router;