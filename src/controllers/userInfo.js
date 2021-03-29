const axios = require('axios').default;
const User = require('../models/users');

module.exports = class{


  constructor(token){

    this.accessToken = token;
    
  }

  async getUserInfo(){

    try{

     const response = await axios.post('https://dev-75o6icsz.us.auth0.com/userinfo',null, {
        headers:{
            'Authorization': this.accessToken,
        }      
      });  
      return response.data;

    }

    catch(e){
      console.log(e);
    }

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
  async saveUser(){
    
    const data =  this.getUserInfo();
    data.then((param) => {
      return param.email;
    });
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