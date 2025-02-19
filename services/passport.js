const passport = require('passport');
const OAuthStrategy = require('passport-oauth2');
const keys = require('../config/keys');

// https://docs.servicenow.com/bundle/madrid-platform-administration/page/administer/security/reference/oauth-auth-code-flow-state-parm.html
OAuthStrategy.prototype.authorizationParams = function(options) {
    return { state: 123 }
}

passport.use('servicenow',new OAuthStrategy({
    authorizationURL: 'https://<INSTANCE>.service-now.com/oauth_auth.do',
    tokenURL: 'https://<INSTANCE>.service-now.com/oauth_token.do',
    clientID: keys.serviceNowClientID,
    clientSecret: keys.serviceNowClientSecret,
    callbackURL: "http://localhost:5000/auth/servicenow/callback"
},
(accessToken,refreshToken,profile,done)=>{
    done(null,accessToken); //Extract Access Token from Callback to send it to Serialize
}));


passport.serializeUser((accessToken,done)=>{
    done(null,accessToken); // Add Access Token to req.session. 
});

passport.deserializeUser((accessToken,done)=>{
    done(null,accessToken); // Add access token to req.user by extracting information from req.session
});
