const { Schema } = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId: { type: ObjectId, default: new ObjectId },
        reactionBody: { type: String, required: true, },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }
);

module.exports = reactionSchema;