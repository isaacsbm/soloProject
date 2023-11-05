const mongoose = require('mongoose');

//Enum for Eras:
const validEras = ["Red", "1989", "Reputation", "Speak Now", "Folklore", "Lover", "Evermore", "Debut", "Midnight"]

const BraceletSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [5, "Name must be at least 5 characters!"],
        required: [true, "Name is required!"]
    },
    description: {
        type: String,
        minLength: [5, "Description must be at least 5 characters!"],
        required: [true, "Description is required!"]
    },
    era: {
        type: String,
        enum: validEras,
        required: [true, "Era is required!"]
    },
    image: {
        type: String,
        required: [true, "Picture is required!"]
    }
}, {timestamps: true});

module.exports = mongoose.model('Bracelet', BraceletSchema);