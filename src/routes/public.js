const express = require('express');
const router = express.Router();
const { join } = require("path");


  // This route doesn't need authentication

  // Serve static assets from the /public folder
router.use(express.static(join(__dirname,'../views/public')));
router.use(express.static(join(__dirname,'../views/private')));


// Endpoint to serve the configuration file
router.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "/auth_config.json"));
});


// Serve the index page for all other requests
router.get("/private/devices", (_, res) => {
  res.sendFile(join(__dirname, "../views/private/devices/devices.html"));
});


  module.exports = router;