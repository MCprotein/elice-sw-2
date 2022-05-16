const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('blog/blog');
});

router.get('/write', (req, res) => {
    res.render('blog/write');
})

//localhost:3000/blog

module.exports = router;