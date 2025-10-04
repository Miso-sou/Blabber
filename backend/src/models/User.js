import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: ""
    },
    nativeLanguage: {
        type: String,
        default: ""
    },
    learningLanguage: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {timestamps:true})

const User = mongoose.model('User', userSchema)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

export default User;

/* 
Notes:
-> the timestamps gives features like createdAt and updatedAt
-> pre is pre hook provided by mongodb which is a middleware that runs before saving a user 
-> In a Mongoose middleware like pre('save'),
this automatically refers to the document being saved — 
i.e., an instance of the User model.

So when you write this.password, you’re directly accessing the password field of the document about to be saved.
*/