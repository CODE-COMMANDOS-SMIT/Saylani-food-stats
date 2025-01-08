// userModel.js
import mongoose from 'mongoose';

// Define schema (as done earlier)
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String, // Making it optional by not setting 'required: true'
    required: false, // Remove this line if you don't want any validation for 'lastname'
  },
  role: {
    type: String,
    enum: ['user', 'donner', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
});

// Create the model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
