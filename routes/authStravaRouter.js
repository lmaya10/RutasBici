var express = require("express");
var router = express.Router();
const passport = require("passport");


const frontURL = "http://localhost:3000";

// Initiates basic Sign in With Slack flow
router.get("/strava",
  passport.authenticate("strava"));

router.get("/strava/callback", 
  passport.authenticate("strava", { failureRedirect: "/" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  });

// Handle removing the user from the session
router.post("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/getUser", (req, res) => {
  //console.log(req);
  res.json(req.user || null);});

module.exports = router;