const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
    connected: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    currentStep: Number,
    tutorial: { type: Schema.Types.ObjectId, ref: 'Tutorial' },
});

const Room = model('Room', roomSchema);
module.exports = Room;
