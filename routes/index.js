var express = require('express');
var router = express.Router();

// GET Login
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Bnext - Front End Challenge'
    });
});

module.exports = router;
