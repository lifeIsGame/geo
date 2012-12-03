// Tile server using the node web framework Express (http://expressjs.com).
var express = require('express'),
    tilelive = require('tilelive'),
    mbtiles = require('mbtiles'),
    mapnik = require('tilelive-mapnik');

var app = express();
mbtiles.registerProtocols(tilelive);

app.get('/:z/:x/:y.*', function(req, res) {
    var x = req.param('x'),
        y = req.param('y'),
        z = req.param('z');

    tilelive.load("mbtiles://" + __dirname + '/data/geography.mbtiles', function(err, source) {
        if (err) throw err;

        source.getTile(z, x, y, function(err, tile, headers) {
            if (err) {
                console.log(x,y,z);
                return;
            }
            res.send(tile);
        });
    });
});

app.listen(8888);
