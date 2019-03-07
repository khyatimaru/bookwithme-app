const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
 username: {
   type: String,
   min: [4, 'Too short, min is 4 characters'],
   max: [32, 'Too long, max is 32 characters']
 },
  email: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    required: 'Password is required'
  },
  rentals: [{ type: Schema.Types.ObjectId, ref: 'Rental'}],
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking'}]

});

userSchema.methods.hasSamePassword = function(requestedPassword) {

  return bcrypt.compareSync(requestedPassword, this.password);
}
//call this just before save function to encrypt password
userSchema.pre('save', function(next) {
  const user = this;
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in your password DB.
      user.password = hash;
      next(); // call all the next functions... in this case it will call save
    });
  });
});
//modelname should have first letter caps
module.exports = mongoose.model('User', userSchema);
