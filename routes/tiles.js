"use strict";

var tilelive = require('tilelive'),
    mbtiles = require('mbtiles');

mbtiles.registerProtocols(tilelive);

module.exports = function(app, urls) {

    tilelive.load("mbtiles://" + __dirname + '/../tiles/geography.mbtiles', function(err, source) {
        if (err) { 
		throw err;
	}

        app.get(urls.tiles, function(req, res) {
            var x = req.param('x'),
                y = req.param('y'),
                z = req.param('z');

            source.getTile(z, x, y, function(err, tile, headers) {
                if (err) {
                    return;
                }
		res.contentType('image/jpeg');
                res.send(tile);
            });
        });
    });

};
