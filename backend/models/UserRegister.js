var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var UserSchema = new Schema({
    email: {
        type: String,
        lowercase:true,
    },
    password: {
        type: String,
        required: true
    }
});

  const UserRegister = mongoose.model('UserRegister',UserSchema)
  module.exports = UserRegister;