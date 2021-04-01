const axios = require('axios').default;
const UserModel = require('../models/userModel');
const { uuid } = require('uuidv4');

errorEnum = {
  SUCCESS: 0,
  USER_NOT_FOUND: -1,
  EMAIL_NOT_VERIFIED: -2,
  USER_AREADY_IN_DB: -3,
  SAVE_ERROR: -4,
  INTERNAL_ERROR: -5, 
}

module.exports = class{

  constructor(token){
    this.accessToken = token; 
    this.result = errorEnum;
  }

  async init(){
    try{
      const response = await axios.post('https://dev-75o6icsz.us.auth0.com/userinfo',null, {
        headers:{
              'Authorization': this.accessToken,
        },      
      }); 

      this.email = response.data.email;
      this.givenName = response.data.given_name;
      this.lastName = response.data.family_name;
      this.emailVerified = response.data.email_verified;
      return this.result.SUCCESS;
    }
    catch(e){
      return this.result.INTERNAL_ERROR;
    }
  };

  async validateUser(){
    try{
      const query = await UserModel.findOne({userEmail: this.email});
      if(!query) return this.result.USER_NOT_FOUND; // user not found
      if(!query.emailVerified) return this.result.EMAIL_NOT_VERIFIED; // email not verified

      return this.result.USER_AREADY_IN_DB; // user validate
    }
    catch(e){
       return this.result.INTERNAL_ERROR; // query error
    }
  };

  async save(){
    try{
      const query = await UserModel.findOne({userEmail: this.email});
      if(query) return this.result.USER_AREADY_IN_DB;// user aready saved in database

      const newUser = new UserModel({userEmail: this.email, emailVerified: this.emailVerified, 
        givenName: this.givenName, lastName: this.lastName});

      const result = await newUser.save();
 
      if(result === newUser) return this.result.SUCCESS;
      return this.result.INTERNAL_ERROR; //save error
    }
    catch(e){
      return this.result.INTERNAL_ERROR; // database error
    }
  }


  async addDevice(){

    try{
      const query = await UserModel.findOne({userEmail: this.email});
      if(!query) return this.result.USER_NOT_FOUND; // user not found
      if(!query.emailVerified) return this.result.EMAIL_NOT_VERIFIED; // email not verified
      const uniqueID = uuid();
      const result = await UserModel.updateOne({userEmail:this.email}, 
        {$push:{
          devices: {deviceID: uniqueID}
        }});
     
        const response = await axios.post('https://tfik1l.internetofthings.ibmcloud.com/api/v0002/device/types/Switch/devices',{
          deviceId: uniqueID,
          authToken: 'VDQWHnF3FRYoM(JO4k',
        }, {
          
        headers:{
              'Authorization': 'Basic YS10ZmlrMWwtZm81ZWVlMjFmZzpWRFFXSG5GM0ZSWW9NKEpPNGs=',
        },  

   
      }); 
      

      //console.log(response.status);
        
      if(result.n === 1) return console.log('device add with sucess');
    }
    catch(e){
      return console.log(e + 'error in update')
    } 
  }
}