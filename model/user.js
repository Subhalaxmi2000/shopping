const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    work: {
        type: String,
        enum: ['admin', 'customer', 'deliveryboy'],
        required: true,
    },
    email: {
      type: String,
      unique: true,  // This enforces the uniqueness
      required: true  // This ensures that the field is mandatory
  },
  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
