const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
  
  
  },
  { timestamps: true }
);

// ✅ Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  // Only hash if the password is new or changed
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    return next(err);
  }
});


module.exports = mongoose.model("User", userSchema);
