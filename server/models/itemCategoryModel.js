const mongoose = require('mongoose')

const ItemCategorySchema = new mongoose.Schema({
    name: String,
    description: String
})

module.exports = mongoose.model('ItemCategory', ItemCategorySchema);