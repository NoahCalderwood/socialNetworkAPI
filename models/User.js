const { Schema, model } = require('mongoose');
// Schema to create user model
const userSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: {
        type: String, unique: true, required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;