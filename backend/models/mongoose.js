'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

module.exports = function () {

  var db = mongoose.connect('mongodb://localhost:27017/fb-demo',{useMongoClient:true});

  var UserSchema = new Schema({
    Name: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    email: {
      type: String, required: true,
      trim: true, unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    photoUrl: {
       type: String
    },
    facebookProvider: {
      type: {
        id: String,
        token: String
      },
      select: false
    }
  });

  UserSchema.set('toJSON', {getters: true, virtuals: true});

  UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
    
    var that = this;
    return this.findOne({
      'facebookProvider.id': profile.id
    }, function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
        
        // Multer File upload settings
       const DIR = './public/';
        var newUser = new that({
          Name: profile.displayName,
          firstName: profile._json.last_name,
          lastName: profile._json.last_name,
          email: profile.emails[0].value,
          photoUrl: profile.photos[0].value,
          facebookProvider: {
            id: profile.id,
            token: accessToken
          }
        });

        newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);

        });
      } else {
       return cb(err, user);
      }
    });
  };

  mongoose.model('User', UserSchema);

  return db;
};