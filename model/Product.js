const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    sku: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    imgName: {
        type: String
    }

});

module.exports = mongoose.model('Product', productSchema);