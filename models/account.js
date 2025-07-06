const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to User model
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
   default: () => parseFloat((Math.random() * 10000).toFixed(2)),
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
