const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('test express');
    res.send('hello express');
    // 소모임, 신회원등급 햇을때 화면이끊기지않게 하기위해
    // db => db 접근 후 => 회원등급 넘버 ++ 변경 후 => 화면
    // next보다는 async/await를 더 많이씀
    next(); // 현재 미들웨어의 기능을 마치고 다음 미들웨어로 연결해준다.
});

router.get('/', (req, res, next) => {
    console.log('2nd express');
    // 화면이 나와야함
});

router.get('/member/:id', (req, res) => {
    const member = req.params.id;
    console.log(member);
    res.send(`${member}`);

});

// Single thread 기반으로 빠르게 처리하는.. -> 80% 만 맞는말

// api 문서
// 함수
// post url /test/member/:id => 회원의 id로 한다. 회원의 db key로 한다.

module.exports = router; // => app.js