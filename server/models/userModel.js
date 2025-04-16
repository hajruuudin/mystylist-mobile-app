const mongoose = require('mongoose')
const Wardrobe = require('./wardrobeModel')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        minLength: [4, "Username must be at least 4 characters long!"],
        maxLength: [15, "Username cannot be longer that 15 characters!"]
    },
    firstName: {
        type: String,
        required: [true, "First name is required!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    wardrobe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wardrobe'
    }
}, { timestamps: true })

// Automatically create a new wardrobe document for the User upon savinga new user in the database
UserSchema.post('save', async function (user) {
    if (user && !user.wardrobe) {
        try {
            const newWardrobe = new Wardrobe({ userId: user._id, items: [], outfits: [] });
            const savedWardrobe = await newWardrobe.save();
            user.wardrobe = savedWardrobe._id;
            await user.save({ validateBeforeSave: false });
        } catch (error) {
            console.error("Error creating wardrobe:", error);
        }
    }
});

// Deleting the Wardrobe of a user Immediately upon a user removing his account
UserSchema.post('findOneAndDelete', async function (doc) {
    if (doc && doc.wardrobe) {
        try {
            await Wardrobe.deleteOne({ _id: doc.wardrobe });
        } catch (error) {
            console.error("Error deleting wardrobe:", error);
        }
    }
});

module.exports = mongoose.model('User', UserSchema);