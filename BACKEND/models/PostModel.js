const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'UserSchema'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref:'UserSchema'
            }
        }
    ],
    comments:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref:'UserSchema'
            },
            text:{
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar:{
                type:String
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ]
}, {collection:"Posts"});

module.exports = PostModel =  mongoose.model('PostSchema', PostSchema);