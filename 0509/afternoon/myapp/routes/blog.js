const express = require('express');
const router = express.Router();
const blogSchema = require('../models/blog');

router.get('/', async (req, res) => {
    const result = await blogSchema.find({}).exec();
    res.render('blog/blog', {content: result});
});

router.get('/read/:id', async (req, res) => {
    const contentNo = req.params.id;
    console.log(contentNo);
    const result = await blogSchema.findOne({no:contentNo}).exec();
    res.render('blog/blogcontent', {content: result});
});

router.get('/write', (req, res) => {
    res.render('blog/write');
});

router.post('/write', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    const blogText = new blogSchema({
        title: title,
        content: content,
    });

    blogText.save().then(result => {
        console.log(result);
        res.redirect('/blog');
    }).catch(err => {
        console.log(err);
        next(err);
    })
});

router.delete('/delete/:id', (req, res) => {
    const no = req.params.id;
    blogSchema.findOneAndDelete({no})
    .then(result => {
        // 성공적인 결과
        return res.status(200).json({
            redirect:'/blog'
        });
    }).catch(err => {
        // 오류 발생했을때
        console.log(err);
    });
});

router.get('/updateread/:id', async (req, res) => {
    const contentNo = req.params.id;
    const result = await blogSchema.findOne({no:contentNo}).exec();
    res.render('blog/blogupdate', {content:result});
})

router.post('/updatewrite/:id', async (req, res) => {
    const {title, content} = req.body;
    const no = req.params.id;
    await blogSchema.findOneAndUpdate({no}, {
        title, content
    }).exec();
    // 데이터를 수정한 후 => 수정이 완료된 페이지로 이동. 수정된 내용 확인
    const updateResult = await blogSchema.findOne({no}).exec();
    res.render('blog/blogcontent', {content:updateResult});
});

router.get('/jsontest', async (req, res) => {
    const result = await blogSchema.find({}).exec();
    res.json(result);
    // const name = JSON.stringify(result);
    // res.json(name);
});

//localhost:3000/blog

module.exports = router;