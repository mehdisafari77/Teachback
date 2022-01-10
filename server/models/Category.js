const { Schema, model } = require('mongoose');

const categorySchema = new Schama({
    name: String
});

const Category = model('Category', categorySchema);
module.exports = Category;
