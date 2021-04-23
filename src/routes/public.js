const express = require('express');
const router = express.Router();
const { join } = require("path");


  // Serve static assets from the /public folder
router.use(express.static(join(__dirname,'../public')));

// Endpoint to serve the configuration file
router.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "/auth_config.json"));
});

router.get('/',(req,res) =>{
  res.sendFile(join(__dirname,'../views/index.html'))

});
 module.exports = router;