const mongoose = require('mongoose')
const Item = require('./itemModel')
const Outfit = require('./outfitModel')

const WardrobeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    items: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Item'
    },
    outfits: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Outfit'
    }
}, { timestamps: true })

// Middleware that whenever a wardrobe is deleted (when a user is deleted)
// all the items and outfits associated with that wardrobe are deleted as well
WardrobeSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        try {
            await Item.deleteMany({ _id: { $in: doc.items } });
            await Outfit.deleteMany({ _id: { $in: doc.outfits } });
        } catch (error) {
            console.error("Error deleting associated items and outfits:", error);
        }
    }
});

module.exports = mongoose.model('Wardrobe', WardrobeSchema);

