const User = require('../controllers/userController');

module.exports = async function(req, res){
  
  const user = new User(req.get('authorization'));
 
  if(await user.init() != user.result.SUCCESS) return res.status(401).json({Error: 'Can not get user info'});
  
  switch(await user.validateUser()){
    case user.result.USER_AREADY_IN_DB:
        return res.json({Error: 'User aready registered'});
      
        case user.result.USER_NOT_FOUND:
          if(!await user.save()) return res.json({Success: 'User saved with success'});
          return res.status(500).json({Error: 'Save user error'});

          case user.result.EMAIL_NOT_VERIFIED:
            return res.status(403).json({Error: 'Email need be verified'});

            case user.result.INTERNAL_ERROR:
              return res.status(500).json({Error: 'Database error'});

              default:
                return res.status(500).json({Error: 'Error'});
  }
};

