const User = require('../controllers/user');
const Device = require('../controllers/device');
const {resultEnum, userEnum} = require('../utils/enuns/globals.enum');


module.exports = async function(req, res,next){

    try{
        const user = new User(req.get('authorization'));
        const device = new Device(user);
        const deviceResult = await device.addDevice();
    
        if(deviceResult === resultEnum.SUCCESS){
           return res.json({Sucess: 'Device successfully added'});
        }
    
        return res.json({Sucess: 'Device error'});

    }
    catch(e){
        next(e);
    }

}