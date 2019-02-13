const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String, minlength: 6 },
});

// Hash the user password before saving the document
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);

    // Override the cleartext password with the hashed one
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Add a password hash validation helper method to the model
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
