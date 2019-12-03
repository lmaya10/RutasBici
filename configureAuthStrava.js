  
const passport = require("passport");
const StravaStrategy = require("passport-strava-oauth2").Strategy;
const session = require("express-session");

//var STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
//var STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

const STRAVA_CLIENT_ID = "41272";
const STRAVA_CLIENT_SECRET = "9c0610e697420042fa81438f99c2ea3885dceb10";

const configureAuthStrava = app => {
  passport.use(
    new StravaStrategy(
      {
        clientID: STRAVA_CLIENT_ID,
			  clientSecret: STRAVA_CLIENT_SECRET,
        callbackURL: "https://rutasbici.herokuapp.com/auth/strava/callback"
		  },
		  (accessToken, refreshToken, profile, done) =>{
			  // asynchronous verification, for effect...
			  process.nextTick(function () {
				  console.log("Profile", profile._json.id);
          
          // To keep the example simple, the user"s Strava profile is returned to
          // represent the logged-in user.  In a typical application, you would want
          // to associate the Strava account with a user record in your database,
          // and return that user instead.
          return done(null, profile);
        });
      }
    )
  );

  // When using Passport's session functionality, you need to tell passport how to
  // serialize/deserialize the user object to the session store
  passport.serializeUser((user, done) => {
    // Simplest possible serialization
    done(null, JSON.stringify(user));
  });

  passport.deserializeUser((json, done) => {
    // Simplest possible deserialization
    done(null, JSON.parse(json));
  });

  app.use(
  	session({
  		cookie: {
        // secure should be enabled in a production app, but disabled for simplicity
        // secure: true,
      },
      resave: false,
      saveUninitialized: false,
      secret: "John loves this!"
    })
  	);

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = configureAuthStrava;