const { default: axios } = require('axios');
const { uuid } = require('uuidv4');
const {resultEnum, userEnum} = require('../utils/enuns/globals.enum');

module.exports = class{

    constructor(user){
        this.user = user;
    }

    async addDevice(){
        try{
        
          const userStatus = this.user.getUserStatus();

          if(userStatus != userEnum.USER_OK) return resultEnum.ERROR;

          const uniqueID = uuid();

          let userInfo = await this.user.getUserInfo();
          userInfo.devices.push({deviceID:uniqueID});
          await userInfo.save();
      
          const response = await axios({
            method: 'post',
            url: 'https://tfik1l.internetofthings.ibmcloud.com/api/v0002/device/types/Switch/devices',
            headers: {
              'Authorization': 'Basic YS10ZmlrMWwtZm81ZWVlMjFmZzpWRFFXSG5GM0ZSWW9NKEpPNGs=',
            },
            data:{
              deviceId: uniqueID,
              authToken: 'VDQWHnF3FRYoM(JO4k',
            }
          });


          return resultEnum.SUCCESS;
  
          //console.log(response.status);
            
          //if(result.n === 1) return console.log('device add with sucess');
        }
        catch(e){
          return console.log(e + 'error in update')
        } 
      }

}