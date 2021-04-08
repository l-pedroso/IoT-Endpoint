const User = require('../controllers/user.controller');
const Device = require('../controllers/device.controller');
const {resultEnum, userEnum} = require('../utils/enuns/globals.enum');


module.exports = async function(req, res){

    const user = new User(req.get('authorization'));
    const initResult = await user.init();

    if(initResult === resultEnum.ERROR || user.getUserStatus() != userEnum.USER_OK){
        return res.status(500).json({Error: 'User error'});
    } 

    const device = new Device(user);
    const deviceResult = await device.addDevice();

    if(deviceResult === resultEnum.SUCCESS){
       return res.json({Sucess: 'Device successfully added'});
    }

    return res.json({Sucess: 'Device error'});

}