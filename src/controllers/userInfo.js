const axios = require('axios').default;

module.exports = function(req, res, next){

    axios.post('https://dev-75o6icsz.us.auth0.com/userinfo',null, {
        headers:{
            'Authorization': req.get('authorization')
        }      
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

      next();

}