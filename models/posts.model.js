const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "Please add the title"],
    },
    body: {
        type: String,
        required: [true, "Please add the body of the post"],
    }
}, { timestamps: true });

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
