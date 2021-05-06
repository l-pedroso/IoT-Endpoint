const axios = require('axios').default;
const UserModel = require('../models/user');
const {resultEnum, userEnum} = require('../utils/enuns/globals.enum');
const errors = require('../utils/error/error');
 

module.exports = class{

  constructor(token){
    this.accessToken = token; 
    this._userStatus = userEnum.INTERNAL_ERROR; 
  }

  async _init(){
    try{
      const response = await axios({
        method: 'post',
        url: 'https://dev-75o6icsz.us.auth0.com/userinfo',
        headers:{
          'Authorization':this.accessToken
        },
      });

      this._email = response.data.email;
      this._givenName = response.data.given_name;
      this._lastName = response.data.family_name;
      this._emailVerified = response.data.email_verified;

      if(this._emailVerified){
        const query = await UserModel.findOne({userEmail: response.data.email});

        if(query){
          this._userStatus = userEnum.USER_OK; // user found and email verified  
        }else{
          this._userStatus = userEnum.USER_NOT_FOUND; // user not found
        }
        return;
      }
      this._userStatus = userEnum.EMAIL_NOT_VERIFIED; // email not verified 
      return;    
    }
    catch(e){
      throw new errors('user not found');
    }
  }

  async addUser(){
    try{
      await this._init();
      if(this._userStatus === userEnum.USER_NOT_FOUND){
        const newUser = new UserModel({userEmail: this._email, givenName: this._givenName, lastName: this._lastName});
        const result = await newUser.save();
       if(result === newUser){
         this._userStatus = userEnum.USER_OK;
       } 
      }
      return this._userStatus;
    }
    catch(e){
      throw(e);
    }
  }


  getUserStatus(){
    return this._userStatus;
  }


  async getUserInfo(){
    try{
      const query = await UserModel.findOne({userEmail: this._email});
      if(query) return query;
      throw e;
    }
    catch(e){
      throw e;
    }
  }

  async addDevice(uuid){
    await this._init();

    if(this._userStatus === userEnum.USER_OK){
      try{
        let user = await this.getUserInfo();
        user.devices.push(uuid);
        await user.save();
      }
      catch(e){
        throw (e);
      }
    }
    return this._userStatus;
  }
}