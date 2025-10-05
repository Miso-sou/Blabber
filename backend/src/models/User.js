import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

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
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('User', userSchema)


export default User;

/* 
Notes:
-> the timestamps gives features like createdAt and updatedAt
-> pre is pre hook provided by mongodb which is a middleware that runs before saving a user 
-> In a Mongoose middleware like pre('save'),
this automatically refers to the document being saved — 
i.e., an instance of the User model.

So when you write this.password, you’re directly accessing the password field of the document about to be saved.

->{ if (!this.isModified('password')) return next();

This line means:

“If the password field hasn’t been modified, skip hashing and move on.”

Why this matters:

When a user updates their profile (like changing name or photo), you’ll call user.save() again.

If you didn’t have this check, the hook would rehash the password every time — even though it’s already hashed.

That would break login, because the password in the database would become a hash of a hash.

So this condition ensures password hashing happens only when:

The user is created, or

The user changes their password.

If the password is unchanged, it just calls next() and continues.
}
*/