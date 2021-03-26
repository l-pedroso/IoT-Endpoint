const axios = require('axios').default;
const User = require('../models/users');

module.exports = function(req, res, next){

    axios.post('https://dev-75o6icsz.us.auth0.com/userinfo',null, {
        headers:{
            'Authorization': req.get('authorization')
        }      
    })  
      .then(function (response) {

        const {userEmail, emailVerify} = response.data;

        User.findOne({email: userEmail}, function(err, user){
          
          if (!err) return res.status(401).json({Error: 'Email is already associated with another account.'});
          
          const newUser = new User({email: response.data.email});

          newUser.save(function(err, user){
            if(err){
              console.log('database error');
            } else {
              console.log('user saved on database');
            }
          });
        });

        console.log(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });

      next();

}