const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  // Check if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  // Ensure password and confirmPassword match
  if (this.password !== this.confirmPassword) {
    return next(new Error('Passwords do not match'));
  }

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined; // Remove confirmPassword before saving

  next();
});

const User = mongoose.model('authUser', userSchema);

module.exports = User;
