const axios = require('axios').default;
const User = require('../models/users');

module.exports = class{


  constructor(token){

    this.accessToken = token;

  }

  getUserInfo(){

    axios.post('https://dev-75o6icsz.us.auth0.com/userinfo',null, {
      headers:{
          'Authorization': this.accessToken,
      }      
    })  
    .then(function (response) {

      console.log(response.data);  
      return response.data;
        
    })
    .catch(function (error) {
      console.log(error);
    });
  };
/*
  validateUser(){
    
    User.findOne({userEmail: email}, function(err, user){

      if (user) return -1;
      if(!email_verified) return -2;
     // if (user) return res.status(401).json({Error: 'Email is already associated with another account.'});
     // if(!email_verified) return res.status(401).json({Error: 'Email need be verified'});
      
      const newUser = new User({userEmail: email, emailVerified: email_verified, 
        givenName: given_name, lastName: family_name});

      newUser.save(function(err, user){
        if(err) return res.status(401).json({Error: 'Database Error'});
        return res.json({Sucess: 'User saved'});
      });
    });

  };
*/
  saveUser(){
    
    const {email, email_verified, given_name, family_name} = this.getUserInfo();
    console.log(email + given_name );
/*
    User.findOne({userEmail: email}, function(err, user){

      if (user) return -1;
      if(!email_verified) return -2;
     // if (user) return res.status(401).json({Error: 'Email is already associated with another account.'});
     // if(!email_verified) return res.status(401).json({Error: 'Email need be verified'});
      
      const newUser = new User({userEmail: email, emailVerified: email_verified, 
        givenName: given_name, lastName: family_name});

      newUser.save(function(err, user){
        if(err) return res.status(401).json({Error: 'Database Error'});
        return res.json({Sucess: 'User saved'});
      });
    });
    */

  }


}