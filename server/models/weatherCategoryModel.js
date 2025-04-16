const mongoose = require('mongoose')

const WeatherCategorySchema = new mongoose.Schema({
    name: String,
    description: String
})

module.exports = mongoose.model('WeatherCategory', WeatherCategorySchema);