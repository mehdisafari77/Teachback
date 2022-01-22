const { Schema, model } = require('mongoose');

const tutorialSchema = new Schema({
    steps: [String],
    name: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

const Tutorial = model('Tutorial', tutorialSchema);
module.exports = Tutorial;
