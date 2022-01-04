const { Schema, model } = require('mongoose');

const tutorialSchema = new Schama({
    steps: [String],
    name: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

const Tutorial = model('Tutorial', tutorialSchema);
module.exports = Tutorial;
