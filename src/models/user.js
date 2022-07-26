const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'employee',
    enum: [ 'employee', 'admin', 'superadmin' ]
  }
});

module.exports = mongoose.model('user', userSchema);