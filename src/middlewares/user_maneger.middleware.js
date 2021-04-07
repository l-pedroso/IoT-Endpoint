const User = require('../controllers/user.controller');
const {resultEnum, userEnum} = require('../utils/enuns/globals.enum');

module.exports = async function(req, res){
  
  const user = new User(req.get('authorization'));
 
  if(await user.init() === resultEnum.ERROR) return res.status(401).json({Error: 'Can not get user info'});

  switch(await user.getUserStatus()){
    
    case userEnum.USER_OK:
        return res.json({Error: 'User aready registered'});
      
        case userEnum.USER_NOT_FOUND:
          if(await user.addUser() === resultEnum.SUCCESS) return res.json({Success: 'User saved with success'});
          return res.status(500).json({Error: 'Save user error'});

          case userEnum.EMAIL_NOT_VERIFIED:
            return res.status(403).json({Error: 'Email need be verified'});

            case userEnum.ERROR:
              return res.status(500).json({Error: 'Database error'});

              default:
                return res.status(500).json({Error: 'Error'});
  }
};

