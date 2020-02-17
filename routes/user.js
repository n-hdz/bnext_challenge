var express = require('express');
var router = express.Router();
var https = require('https');

// GET User by Id
router.post('/', function (req, res, next) {
    let id = req.body.idUsuario;
    // Check for numbers only
    if (/^[0-9]*$/.test(id)) {
        // Make API Call
        getAPI(id).then(result => {
            if (result.status == 200) {
                res.render('user', {
                    title: 'Bnext - Front End Challenge',
                    err: false,
                    user: {
                        name: result.data.name,
                        surname: result.data.surname,
                        phone: result.data.phone,
                        email: result.data.email,
                        age: result.data.age
                    }
                });
            } else if (result.status == 404) {
                // Nonexistent user
                res.redirect('/login?valid=false&err=user');
            }
        });
    } else {
        // Invalid Form
        res.redirect('/login?valid=false&err=format');
    }
});

module.exports = router;

async function getAPI(id) {
    let result = await callPartner(id);
    return result;
}

function callPartner(id) {
    return new Promise((resolve, reject) => {
        const https = require('https');
        const options = {
            method: 'GET',
            host: 'api.bnext.io',
            path: '/partner_test/user?id=' + id,
        }
        const req = https.request(options, res => {
            res.on('data', d => {
                let json = JSON.parse(d);
                resolve(json)
            });
        })
        req.on('error', error => {
            reject(error);
        });
        req.end()
    });
    
}