var express = require('express');
var router = express.Router();
var request = require("request");

var sdids = "xxxxx";
var token = "xxxxx";

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.render('index');
});

router.get('/count', function(req, res, next) {
    var options = {
        method: 'GET',
        url: 'https://api.artik.cloud/v1.1/messages/last',
        qs: { sdids: sdids, count: '1' },
        headers: {
            'cache-control': 'no-cache',
            'authorization': 'Bearer ' + token
        }
    };
    var data, k = 0;
    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        //console.log(body);
        data = JSON.parse(body).data[0].data;
        //console.log(data.data[0].data);
        res.send(data);
    });

});
module.exports = router;