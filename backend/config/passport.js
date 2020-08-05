'use strict';

var passport = require('passport'),
  FacebookTokenStrategy = require('passport-facebook-token'),
  User = require('mongoose').model('User');

module.exports = function () {
  passport.use(new FacebookTokenStrategy({
    clientID: "341165706888834",
    clientSecret: "0923f4e66d7cabeb9380dda8478d9ce9",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
      });
    }));

};