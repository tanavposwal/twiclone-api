import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        default: 'a.twizen'
    },
    bio: {
        type: String,
        default: 'A twi clone user.'
    },
    profilePicture: {
        type: String,
        default: 'default-profile-picture.jpg'
    },
    followers: [String],
    following: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', userSchema);