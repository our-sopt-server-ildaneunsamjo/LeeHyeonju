var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    const userInfo = {
        id: "bokdoll",
        pwd: "qwerty",
        name: "이현주"
    }

    const result = {
        status: 200,
        message: "Login 성공",
        data: userInfo
    };
    res.status(200).send(result);
});

module.exports = router;