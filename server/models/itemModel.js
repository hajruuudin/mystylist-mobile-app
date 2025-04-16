const mongoose = require('mongoose')
const User = require('./userModel')

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required for the item!"],
        minLength: [3, "Item name must have at least 3 characters!"],
        maxLength: [15, "Item name cannot be longer than 15 characters!"]
    },
    description: {
        type: String,
        maxLength: [64, "Item description cannot be longer than 64 characters!"]
    },
    brand: {
        type: String,
        required: [true, "Brand name of the item is required!"]
    },
    size: {
        type: String,
        required: [true, "Size of the item is required"]
    },
    personalRating: {
        type: Number,
        enum: [1,2,3,4,5],
        required: [true, "Personal rating of the item is required"]
    },
    itemCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemCategory'
    },
    weatherCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WeatherCategory'
    }
}, { timestamps: true })

module.exports = mongoose.model('Item', ItemSchema);