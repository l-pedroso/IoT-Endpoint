const { uuid } = require('uuidv4');

module.exports = class{

    constructor(user){

        this.user = user;

    }

    async addDevice(){

        try{

            this.user.validadeUser()
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