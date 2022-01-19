const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
});

const User = model('User', userSchema);

User.prototype.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = User;
