var express = require('express');
const crypto = require('crypto');
var router = express.Router();
let User = require('../models/user');
let util = require('../modules/util');
let resMessage = require('../modules/responseMessage');
let statusCode = require('../modules/statusCode');

const makeSalt = async () => {
  const salt = await crypto.randomBytes(32).toString('hex');
  return salt;
}

const encrypt = async (salt, password) => {
  const hashed = await crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');
  return hashed;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('페이지');
});

/**
 * 회원가입
 */
router.post('/signup', async(req, res) => {
  // 1. request body에서 값을 읽어온다.
  const {id, name, password, email} = req.body;

  // 예외처리 1. parameter check
  if (!id || !name || !password || !email){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  // 예외처리 2. 아이디 중복 체크
  if (User.filter(user => user.id == id).length > 0){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_ID));
    return;
  }

  // Mission. Level2 - password hash해서 salt 값과 함께 저장하기
  const salt = await makeSalt();
  const hashed = await encrypt(salt, password);

  // 2. 새로운 User를 등록한다.
  User.push({id, name, hashed, email, salt});

 // 3. 응답 메시지를 보낸다.
  res.status(statusCode.OK).send(util.success(200, '회원가입 성공', User));
});


/**
 * 로그인
 */
router.post('/signin', async(req, res) => {
  //request body에서 데이터 가져오기
  const {
    id, password
  } = req.body;

  // request data 확인 - 없다면 NULL
  if(!id || !password){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  const user = User.filter(user => user.id == id);
  if (user.length == 0){
    res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }

  // 비밀번호 확인 - 없다면 Miss match password 반환
  if (user[0].salt){
    var hashed = await encrypt(user[0].salt, password);
    if (user[0].hashed !== hashed){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
      return;
    }
  }else{
    if (user[0].password !== password){
      console.log(user[0].password);
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
      return;
    }
  }
  
  // 성공 - login success와 함께 user Id 반환
  res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS));

});


/**
 * 프로필 조회
 */
router.get('/profile/:id', async(req, res) => {
  // request params 에서 데이터 가져오기
  const id = req.params.id;
  const user = User.filter(user => user.id == id);

  // 존재하는 아이디인지 확인 - 없다면 No user 반환
  if (user.length == 0){
    res.status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    return;
  }

  // 성공 - login success와 함께 user Id 반환
  res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userID : user[0].id}));

});

module.exports = router;
