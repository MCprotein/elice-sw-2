const express = require('express');
const BookSchema = require('../models/book');
const router = express.Router();
const postCtr = require('../controller/post');

router.get('/', (req, res) => {
    res.render('post');
})

router.post('/', (req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const date = req.body.date;
    res.json({name:name, phone:phone, date:date});
    // next();
});

// router.post('/', (req, res) => {
//     res.redirect('/expost');
// })

router.get('/bookinfo/:id', postCtr.getbookinfo);

router.post('/addbook', postCtr.addbook);

router.get('/del', (req, res) => {
    res.render('delete');
})

router.delete('/del/:id', (req, res) => {
    const bookname = req.params.id;

    BookSchema.findOneAndDelete({bookname: bookname})
    .then(result => {
        res.json({redirect:'/expost'});
    }).catch(err => console.log(err));
});

// router.post('/del/:id', (req, res) => {
//     const bookname = req.params.id;

//     BookSchema.findOneAndDelete({bookname: bookname})
//     .then(result => {
//         res.json({redirect:'/expost'});
//     }).catch(err => console.log(err));
// });

module.exports = router;