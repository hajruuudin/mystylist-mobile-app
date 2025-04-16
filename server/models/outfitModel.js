const mongoose = require('mongoose')

const OutfitSchema = new mongoose.Schema({
     name: {
        type: String,
        required: [true, "Outfit name is required for the item!"],
        minLength: [3, "Outfit name must have at least 3 characters!"],
        maxLength: [15, "Outfit name cannot be longer than 15 characters!"]
    },
    description: {
        type: String,
        maxLength: [64, "Item description cannot be longer than 64 characters!"]
    },
    personalRating: {
        type: Number,
        enum: [1,2,3,4,5],
        required: [true, "Personal rating of the item is required"]
    },
    outfitItems: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Item'
    },
    outfitOcassionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OutfitOcassion'
    },
    weatherCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WeatherCategory'
    }
}, { timestamps: true })

module.exports = mongoose.model('Outfit', OutfitSchema);