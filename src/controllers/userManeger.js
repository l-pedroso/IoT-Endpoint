const UserManeger = require('./userInfo');


module.exports = async function(req, res){

    const user = new UserManeger(req.get('authorization'));
   const email =  await user.saveUser();
   console.log(email);
    res.json({message:'sucess'});

};

