import mongoose from "mongoose" 

const userSchema = new mongoose.Schema({
    name: {
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
        required: true
    }, 
    role: {
        type: String, 
        default: 'user'
    }, 
    root: {
        type: Boolean, 
        default: false
    },
    avatar: {
        type: String, 
        default: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fpyxis.nymag.com%2Fv1%2Fimgs%2F87f%2Fee0%2F39f1231982cb943f9a9f42b55a183604de-avatar.rsquare.w1200.jpg&imgrefurl=https%3A%2F%2Fwww.thecut.com%2F2020%2F05%2Favatar-the-last-airbender-is-the-greatest-show-ever.html&tbnid=TEP-Iasiuu-irM&vet=12ahUKEwjz1LDKqabvAhXFoFMKHaxLBdoQMygMegUIARDYAQ..i&docid=2-IVb5T4xHqfDM&w=835&h=835&q=avatar&ved=2ahUKEwjz1LDKqabvAhXFoFMKHaxLBdoQMygMegUIARDYAQ'
    }
}, {
    timestamps: true
})

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)

export default Dataset