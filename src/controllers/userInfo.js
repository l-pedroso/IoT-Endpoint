const axios = require('axios').default;
const User = require('../models/users');

module.exports = function(req, res, next){

    axios.post('https://dev-75o6icsz.us.auth0.com/userinfo',null, {
        headers:{
            'Authorization': req.get('authorization')
        }      
    })  
      .then(function (response) {

        const {email, email_verified} = response.data;

        User.findOne({userEmail: email}, function(err, user){
          
          if (user) return res.status(401).json({Error: 'Email is already associated with another account.'});
          if(!email_verified) return res.status(401).json({Error: 'Email need be verified'});
          
          const newUser = new User({userEmail: email, emailVerified: email_verified});

          newUser.save(function(err, user){
            console.log(err);
            if(err) return res.status(401).json({Error: 'Database Error'});
            return res.json({Sucess: 'User saved'});
          }) 
        })
        console.log(response.data);      
      })
      .catch(function (error) {
        console.log(error);
      });
}