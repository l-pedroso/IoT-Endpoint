const axios = require('axios').default;
const UserModel = require('../models/userModel');


const resultEnum = {
  SUCCESS: 0,
  ERROR: -1,
}

const userEnum = {
  USER_OK: 0,
  USER_NOT_FOUND: -1,
  EMAIL_NOT_VERIFIED: -2, 
  ERROR: -4,
}



module.exports = class{

  constructor(token){
    this.accessToken = token; 
    this.result = resultEnum;
    this.status = userEnum;
    this._userStatus = userEnum.INTERNAL_ERROR; 
  }

  async init(){

    try{

      const response = await axios({
        method: 'post',
        url: 'https://dev-75o6icsz.us.auth0.com/userinfo',
        headers:{
          'Authorization':this.accessToken
        },
      });
     
      this.email = response.data.email;
      this.givenName = response.data.given_name;
      this.lastName = response.data.family_name;
      this.emailVerified = response.data.email_verified;
  
      const query = await UserModel.findOne({userEmail: this.email});
    
      if(!query) this._userStatus = userEnum.USER_NOT_FOUND; // user not found

      if(query){
        if(!query.emailVerified){
          this._userStatus = userEnum.EMAIL_NOT_VERIFIED; // email not verified
        }else{
          this._userStatus = userEnum.USER_OK; // user found and email verified
        }
      }
      return resultEnum.SUCCESS;
    }
    catch(e){
      this._userStatus = userEnum.ERROR;
      return resultEnum.ERROR;
    }
  };

  async addUser(){
    try{

      if(this._userStatus === userEnum.USER_OK)  return resultEnum.SUCCESS;
      if(this._userStatus === userEnum.ERROR) return resultEnum.ERROR;
      
      const newUser = new UserModel({userEmail: this.email, emailVerified: this.emailVerified, 
        givenName: this.givenName, lastName: this.lastName});

      const result = await newUser.save();
 
      if(result === newUser){ 
        if(this.emailVerified === true) this._userStatus = userEnum.USER_OK;
        if(this.emailVerified === false) this._userStatus = userEnum.EMAIL_NOT_VERIFIED;
        return resultEnum.SUCCESS;
      }
      return resultEnum.ERROR
    }
    catch(e){
      return resultEnum.ERROR; // database error
    }
  }


  getUserStatus(){
    return this._userStatus;
  }


  async getUserInfo(){

    try{
      const query = await UserModel.findOne({userEmail: this.email});
      if(query) return query;
      return resultEnum.ERROR;
    }
    catch(e){
      return resultEnum.ERROR;
    }
  }
}