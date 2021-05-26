
module.exports = function FacebookAuth(app, passport){

    app.get("/auth/facebook", passport.authenticate("facebook",  { scope: ['email'] }));

    app.get(
      "/auth/facebook/callback",
      passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/fail"
      })
    );
    
    app.get("/fail", (req, res) => {
      res.send("Failed attempt");
    });
    
    app.get("/", (req, res) => {
      res.send("Success");
    });
      
}