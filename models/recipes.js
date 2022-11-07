const mongoose = require('mongoose')

const recipesSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String,required: true},
    img: { type: String, required: true},
    ingredients: { type: String,required: true},
    instructions: {type: String,required: true}
})

const Recipes = mongoose.model("Recipes",recipesSchema)

module.exports = Recipes