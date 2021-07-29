const {Response, Token } = require('../helpers');
const {JWT_SECRET} = process.env;
const jwt = require("jsonwebtoken");

const token = new Token();

module.exports = function GoogleAuth(app, passport){

    app.get('/failed', (req, res) => {
        //send user to login
        res.redirect("http://trendupp.com/#/login")
      });
      
      // Middleware - Check user is Logged in
      const checkUserLoggedIn = (req, res, next) => {
        // if it fails send user to login page
        req.user ? next(): res.redirect("http://trendupp.com/#/login");
      }
      
      //Protected Route.
      app.get('/profile', checkUserLoggedIn, (req, res) => {
        res.send(`<h1>${req.user.displayName}'s Profile Page</h1>`)
      });
      
      // Auth Routes
      app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
      
      app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
        function (req, res) {
          console.log(req.user._json)
          const newToken = jwt.sign(req.user._json, "this is a big secret, another one, be like that", { expiresIn: "24hr" });
          res.redirect(`http://localhost:3000/#/dashboard?user=${newToken}`)
        }
      );
      
}