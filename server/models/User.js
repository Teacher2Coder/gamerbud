const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  xboxTag: {
    type: String,
  },
  psTag: {
    type: String,
  },
  nintendoTag: {
    type: String,
  },
  twitchTag: {
    type: String,
  },
  steamTag: {
    type: String,
  },
  appleTag: {
    type: String,
  },
  galaxyTag: {
    type: String,
  },
  games: [
    {
      type: String
    }
  ]
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
