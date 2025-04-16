const mongoose = require('mongoose')

const OutfitOcassionSchema = new mongoose.Schema({
    name: String,
    description: String
})

module.exports = mongoose.model('OutfitOcassion', OutfitOcassionSchema);