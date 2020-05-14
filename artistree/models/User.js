const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    displayName: String,
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Artist", "Client"],
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Visual Artist",
        "Musician/Band",
        "Tattoo Artist",
        "Designer",
        "Sound Designer",
        "Photographer",
      ],
    },
    subcategory: String,
    //todo add the dates where avaialble
    artworks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artwork",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
