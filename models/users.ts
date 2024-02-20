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
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to other users who are following this user
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to other users whom this user is following
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', userSchema);