var Country = require('../models/country'),
    urls    = require('../urls');

function generateGEOJson(countries) {
    var features = [];
    for (var i=0; i<countries.length; i++) {
	var c = countries[i];
	if (c.geometry) {
		var feature = { type: "Feature",
				properties: {
					name: c.countryName,
					countryCode: c.countryCode,
					isoAlpha3: c.isoAlpha3
				},
				geometry: {
					type: c.geometry.type,
					coordinates: c.geometry.coordinates
				}
			};
		features.push(feature);
	}

    }

    var geojson = { type: "FeatureCollection",
		    features: features };

    return geojson;
}

module.exports = function(app) {

    app.get(urls.api.countries.world.url, function(req, res) {
        Country.find(function(err, countries) {
            if (err) throw err;
            return res.send(countries);
        });
    });

    app.get(urls.api.countries.europe.url, function(req, res) {
        Country.find({ continentName: "Europe"}, function(err, countries) {
            if (err) throw err;
            return res.send(countries);
        });
    });

    app.get(urls.api.countries.africa.url, function(req, res) {
        Country.find({ continentName: "Africa"}, function(err, countries) {
            if (err) throw err;
            return res.send(countries);
        });
    });

    app.get(urls.api.countries.world.geojson.url, function(req, res) {
        Country.find(function(err, countries) {
            if (err) throw err;
	    var geojson = generateGEOJson(countries);
            return res.send(JSON.stringify(geojson));
        });
    });

    app.get(urls.api.countries.europe.geojson.url, function(req, res) {
        Country.find({ continentName: "Europe" }, function(err, countries) {
            if (err) throw err;
	    var geojson = generateGEOJson(countries);
            return res.send(JSON.stringify(geojson));
        });
    });

    app.get(urls.api.countries.africa.geojson.url, function(req, res) {
        Country.find({ continentName: "Africa" }, function(err, countries) {
            if (err) throw err;
	    var geojson = generateGEOJson(countries);
            return res.send(JSON.stringify(geojson));
        });
    });

};
