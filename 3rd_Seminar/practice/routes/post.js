var express = require('express');
var router = express.Router();
let User = require('../models/user');
let util = require('../modules/util');
let resMessage = require('../modules/responseMessage');
let statusCode = require('../modules/statusCode');


/**
 * 모든 게시글 조회
 */
router.get('/', function(req, res, next){
    res.send("포스트 받아오기");
});


/**
 * 게시글 고유 id값을 조회
 */
module.exports = router;