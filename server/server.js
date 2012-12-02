// Tile server using the node web framework Express (http://expressjs.com).
var express = require('express'),
    mbtiles = require('mbtiles'),
    tilelive = require('tilelive');

var app = express();
mbtiles.registerProtocols(tilelive);

app.get('/:z/:x/:y.*', function(req, res) {
    var options = {
        x: req.param('x'),
        y: req.param('y'),
        z: req.param('z'),
        format: req.params[0],
        datasource: __dirname + '/data/geography.mbtiles'
    };
    tilelive.load(__dirname + '/data/geography.mbtiles', function(err, data) {
        if (!err) {
            res.send.apply(res, data);
        } else {
            res.send('Tile rendering error: ' + err + '\n');
        }
    });
});

app.listen(8888);
