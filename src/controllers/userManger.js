const UserManeger = require('./userInfo');


module.exports = function(req, res){

    const user = new UserManeger(req.get('Authorization'));

}