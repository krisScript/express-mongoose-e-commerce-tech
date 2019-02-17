const User = require('./user');
const mongoose = require('mongoose');
const options = { discriminatorKey: 'role' };
const adminSchema = User.discriminator(
  'role',
  new mongoose.Schema({ admin: { type: Boolean, default: true } }, options)
);

module.exports = adminSchema
