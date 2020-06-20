var express = require('express');
var router = express.Router();
let Post = require('../models/post');
let util = require('../modules/util');
let resMessage = require('../modules/responseMessage');
let statusCode = require('../modules/statusCode');


/**
 * 모든 게시글 조회
 */
router.get('/', function(req, res, next){
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, Post));
});


/**
 * 게시글 고유 id값을 조회
 */
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const post = Post.filter(post => post.id == id);    // id가 숫자로 저장되어 있어서 ===가 아닌 ==

    if (post.length == 0){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
        return;
    }

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, post));
});


/**
 * 게시글 생성
 */
router.post('/', async(req, res) => {
    const {user_id, title, contents} = req.body;
    const id = Post.length+1;
    Post.push({id, user_id, title, contents});

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.POST_SUCCESS, Post[id-1]));
});


/**
 * 게시글 고유 id값을 가진 게시들을 수정
 */
router.put('/:id', async(req, res) => {
    const id = req.params.id;
    const {user_id, title, contents} = req.body;
    const post = Post.filter(post=> post.id==id);

    if (!id || !user_id || !title || !contents){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    if(post.length == 0){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
        return;
    }

    Post[id-1] = {id, user_id, title, contents};
    res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.UPDATE_POST,Post[id-1]));
});

/**
 * 게시글 고유 id값을 가진 게시들을 삭제
 */
router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const post = Post.filter(post=> post.id==id);

    if (!id){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
        return;
    }

    if(post.length == 0){
        res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
        return;
    }

    // 배열에서 객체 삭제 : splice(삭제할 인덱스, 삭제할 객체 개수)
    Post.splice(id-1, 1);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.DELETE_POST, Post));
});

module.exports = router;