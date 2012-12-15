"use strict";

var urls= require("../urls"),
    tilelive = require('tilelive'),
    mbtiles = require('mbtiles');

mbtiles.registerProtocols(tilelive);

module.exports = function(app) {

    tilelive.load("mbtiles://" + __dirname + '/../data/geography.mbtiles', function(err, source) {
        if (err) { 
		throw err;
	}

        app.get('/tiles/:z/:x/:y.*', function(req, res) {
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
