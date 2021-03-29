const axios = require('axios').default;
const User = require('../models/users');

exports.userRegister = function(req, res, next){

    axios.post('https://dev-75o6icsz.us.auth0.com/userinfo',null, {
        headers:{
            'Authorization': req.get('authorization')
        }      
    })  
      .then(function (response) {

        const {email, email_verified, given_name, family_name} = response.data;

        User.findOne({userEmail: email}, function(err, user){
          
          if (user) return res.status(401).json({Error: 'Email is already associated with another account.'});
          if(!email_verified) return res.status(401).json({Error: 'Email need be verified'});
          
          const newUser = new User({userEmail: email, emailVerified: email_verified, 
            givenName: given_name, lastName: family_name});

          newUser.save(function(err, user){
            if(err) return res.status(401).json({Error: 'Database Error'});
            return res.json({Sucess: 'User saved'});
          });
        });
        console.log(response.data);      
      })
      .catch(function (error) {
        console.log("erroo");
      });
}