const BookSchema = require('../models/book');

const getbookinfo = (req, res) => {
    const authorname = req.params.id;

    // Movie.find({ year: { $gte: 1980, $lte: 1989 } }, function(err, arr) {});
    // BookSchema.findOne({ auther: authorname }, (err, result) => {
    //     if (result) {
    //         return res.json(result);
    //     } else {
    //         return res.send('등록된 작가가 없습니다.');
    //     }
    // });
    BookSchema.find({author:authorname})
    .then(result => {
        res.json(result);
    }).catch(err => console.log(err));
}

const addbook = (req, res) => {
    const bookname = req.body.bookname;
    const author = req.body.author;
    const price = req.body.price;
    const date = req.body.date;

    let bookData = new BookSchema({
        bookname: bookname,
        author: author,
        price: price,
        publish: date
    });

    bookData.save();
    res.redirect('/expost');
}

module.exports = {
    getbookinfo,
    addbook,
}