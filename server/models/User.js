const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    stepFinished: Boolean,
});

const User = model('User', userSchema);

User.prototype.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

User.prototype.toggleStepFinished = function() {
    this.stepFinished = !this.stepFinished;
}

module.exports = User;
