const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// schema: 값들의 모음

const book = new Schema({
    bookname: String,
    author: String,
    price: {
        type:Number,
        default: 5000
    },
    publish: Date,
    sales: {
        type:Boolean,
        default: true,
    }
})

const bookData = mongoose.model('book', book);
// 'book' 이건 collection 이름임
module.exports = bookData;