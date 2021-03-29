const UserManeger = require('./userInfo');


module.exports = async function(req, res){
    
  const user = new UserManeger(req.get('authorization'));
 
  try{
    await user.init();
  }
  catch(e){
    return res.status(401).json({Error: 'Can not get user info'});
  }


  const validation = await user.validateUser();

  
  
};

