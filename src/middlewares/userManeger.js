const User = require('../controllers/userController');
const Device = require('../controllers/deviceController');

module.exports = async function(req, res){
  
  const user = new User(req.get('authorization'));
 
  if(await user.init() === user.result.ERROR) return res.status(401).json({Error: 'Can not get user info'});
  
  switch(await user.getUserStatus()){
    case user.status.USER_OK:
        const device = new Device(user);
        device.addDevice();
        return res.json({Error: 'User aready registered'});
      
        case user.status.USER_NOT_FOUND:
          if(await user.addUser() === user.result.SUCCESS) return res.json({Success: 'User saved with success'});
          return res.status(500).json({Error: 'Save user error'});

          case user.status.EMAIL_NOT_VERIFIED:
            return res.status(403).json({Error: 'Email need be verified'});

            case user.status.ERROR:
              return res.status(500).json({Error: 'Database error'});

              default:
                return res.status(500).json({Error: 'Error'});
  }
};

