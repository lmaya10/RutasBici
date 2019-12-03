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
    res.redirect(`${frontURL}/`);
  });

// Handle removing the user from the session
router.post("/logout", (req, res) => {
  req.logout();
  res.redirect(`${frontURL}/`);
});

router.get("/getUser", (req, res) => {
  console.log(req.user);
  res.json(req || null);});

module.exports = router;