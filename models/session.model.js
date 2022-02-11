const mongoose = require("mongoose");


const sessionSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      valid: { type: Boolean, default: true },
      userAgent: { type: String },
    },
    {
      timestamps: true,
    }
);


module.exports = mongoose.model("Session", sessionSchema);