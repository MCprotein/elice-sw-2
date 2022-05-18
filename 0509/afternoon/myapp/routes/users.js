var express = require('express');
const userSchema = require('../models/newuser');
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const session = require('express-session');
const parseurl = require('parseurl');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('blog/auth');
});

// 정규 표현식으로 인증
//passport

router.get('/cookie', (req, res) => {
  // key(변수-이름) ,value(저장하고싶은값)
  res.cookie('drink', 'water');
  res.send('set cookies');
});

// 프로그래밍 => 디지털 프랜스포메이션
// 실제 생활에 있는걸 => 컴퓨터로 옮기는 일
// 

router.post('/signup'
        , body('email').isEmail().withMessage('아이디는 email 형태를 따르셔야 합니다.')
        , body('password').isLength({min:5}).withMessage('비밀번호는 최소 5글자 이상입니다.')
        , async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  // 중복 가입
  const findresult = await userSchema.findOne({email});

  if (findresult) {
    res.status(401).json({msg:'이미 가입된 계정입니다.'});
  } else {
    const salt = bcrypt.genSaltSync(10);
    const bcryptpw = bcrypt.hashSync(password, salt);
    // 복호화 할때 기준이 되는 메세지의 길이가 존재함.

    userSchema.create({
      email: email,
      password: bcryptpw
    }).then(result => {
      // console.log(result);
      res.status(200).json(result);
    });
  }
  // 찾는 쿼리.
  // 결과 존재 => 중복으로 가입이 되어 있는 경우.
  // 결과가 X => 신규가입.
  // 

});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 가입을 했던 유저인지 아닌지
  const userdata = await userSchema.findOne({email}).exec();

  if (!userdata) { // 유저 데이터가 없다면
    return res.status(401).json({msg: '가입되지 않은 계정입니다.'});
  } else { // 유저 데이터가 존재한다면 => 비밀번호가 매칭되는지
    const pwMatch = bcrypt.compareSync(password, userdata.password);
    if (pwMatch) {
      res.status(200).json({msg:'OK'});
    } else {
      res.status(401).json({msg:'비밀번호가 일치하지 않습니다.'});
    }
  }
});

router.get('/login', (req, res) => {
  res.render('blog/login');
});

// 쿠키와 세션
// 쿠키 => 사용자의 브라우저에 저장 데이터 모음 => JWT token => 정보 저쟝량 분산 => 비용 절감
// 보안 이슈의 문제로부터 훨씬 자유로움
// 쿠키로서 너의 정보를 너에게 저장. 그것이 잘못되는 것은 너의 책임이다.

// 세션 => 서버쪽에 저장하는 데이터 모음 => session 에 저장
// 각 나라마다 언어정보가 다름 ==> 번역된 텍스트를 각 나라에 맞게.

// 복붙
router.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: true
  })
);
// users.js -> router구간에서만 사용 가능하게 함
// 프로젝트 전체구간에서는 어떻게해얗할지 각자 고민


// 조건부 렌더링
//세션으 활용해서 어떻게 핳ㄹ건가
router.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

  next()
})
//api 과부하: Apache JMeter
router.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

module.exports = router;
