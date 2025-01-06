const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // Ensure name is required
      unique: true,
      trim: true, // Trim any leading/trailing spaces
      minlength: [4, "Username must be at least 4 characters long"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "Please provide a valid email address", // Email format validation
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: String,
  },
  {
    timestamps: true,
  }
);

// Middleware to ensure email is stored in lowercase
userSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
