const { userEnum } = require("../utils/enuns/globals.enum");
const BaseError = require("../utils/error/baseError");

exports.userErrorHandler = function(err, req, res, next){
    if(err instanceof BaseError){
        switch(err.name){
            case userEnum.USER_NOT_FOUND:
                res.status(500).json({ERROR:'user not found!'});
                break;

                case userEnum.EMAIL_NOT_VERIFIED:
                    res.status(500).json({ERROR: 'email not verified'});
                    break; 

                    default:
                        res.status(500).json({ERROR: 'internal error'});
                        break; 
        }
        console.log(err.stack);
        return;
    }
    next(err);
}