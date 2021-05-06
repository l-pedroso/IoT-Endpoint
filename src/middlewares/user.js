const User = require('../controllers/user');
const {resultEnum, userEnum} = require('../utils/enuns/globals.enum');

module.exports = async function(req, res, next){
  const user = new User(req.get('authorization'));
  try {
    const result = await user.addUser();
    switch(result){
      case userEnum.USER_OK:
          return res.json({Sucess: 'User registered'});
      
          case userEnum.USER_NOT_FOUND:
            return res.status(500).json({Error: 'Save user error'});

           case userEnum.EMAIL_NOT_VERIFIED:
              return res.status(403).json({Error: 'Email need be verified'});

              case userEnum.ERROR:
                return res.status(500).json({Error: 'Database error'});

                default:
                  return res.status(500).json({Error: 'Error'});             
    }   
  } 
  catch (e) {
    next(e);
  }
};

