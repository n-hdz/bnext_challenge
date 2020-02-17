var express = require('express');
var router = express.Router();

// GET Login
router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'Bnext - Front End Challenge',
        valid: req.query.valid == 'false' ? false : true,
        err: req.query.err
    });
});

module.exports = router;
