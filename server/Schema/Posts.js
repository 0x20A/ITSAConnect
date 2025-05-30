import mongoose, { Schema } from "mongoose";

const blogSchema = mongoose.Schema({

    post_id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    des: {
        type: String,
        maxlength: 200,
    },
    tags: {
        type: [String],
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    activity: {
        total_likes: {
            type: Number,
            default: 0
        },
    },
    comments: {
        type: [],
        ref: 'comments'
    },
}, 
{ 
    timestamps: {
        createdAt: 'publishedAt'
    } 

})

export default mongoose.model("posts", blogSchema);