const { Schema, model } = require('mongoose');


const userSchema = new Schema(
{
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true, 
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: 'thought', 
    },
    ],
    friends: [
    {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    ],
},
{
    toJSON: {
        virtuals: true,
      },
      id: false,
}
);

userSchema.virtual('friendCount').get(function () {
    console.log('Calculating friendCount');
    if (!this.friends) {
        console.log('No friends array found');
        return 0;
    }
    return this.friends.length;
});

const User = model('user', userSchema);
module.exports = User;