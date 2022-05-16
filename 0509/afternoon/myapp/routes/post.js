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
// bookinfo에 있는 정보를 다 가져오는 코드
router.get('/getlist', async (req, res) => {
    const result = await BookSchema.find({}).exec();
    return res.status(200).json(result);
});
// error 핸들링

router.get('/users', (req, res) => {
    res.render('user');
});

router.post('/users', async (req, res, next) => {
    try {
        const userid = req.body.userid;
        const job = req.body.job;
        const user = new userSchema({
            userid: userid,
            job: job
        });
        const result = await user.save();
        res.status(200).json({
            result,
            message: 'user saved'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;