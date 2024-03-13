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
        default: 'https://cdn.vectorstock.com/i/preview-1x/71/90/blank-avatar-photo-icon-design-vector-30257190.jpg'
    },
    followers: [String],
    following: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        default: false
    }
});

export const User = mongoose.model('User', userSchema);