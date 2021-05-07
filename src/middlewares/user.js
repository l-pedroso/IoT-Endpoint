const User = require('../controllers/user');
const {resultEnum, userEnum} = require('../utils/enuns/globals.enum');

module.exports = function(req, res, next){
  const user = new User(req.get('authorization'));
  user.addUser()
  .then(() => res.json({SUCCESS: 'user add'})).catch(next); 
};

