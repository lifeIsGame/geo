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

    app.get(urls.api.maps.config.url, function(req, res) {
	var continent = req.params.continent;
	var config = {
		europe: {
				center: {
					lat: 55.7765730186677,
					lng: 27.773437499999996
				},
				zoom: {
					actual: 4,
					max: 5,
					min: 3
				}
		},
		southamerica: {
				center: {
					lat: -19.973348786110602,
					lng: -59.0625
				},
				zoom: {
					actual: 3,
					max: 5,
					min: 3
				}
		},
		northamerica: {
				center: {
					lat: 43.32517767999296,
					lng: -100.546875
				},
				zoom: {
					actual: 3,
					max: 5,
					min: 3
				}
		},
		asia: {
				center: {
					lat: 34.45221847282654,
					lng: 81.03515625
				},
				zoom: {
					actual: 4,
					max: 5,
					min: 3
				}
		},
		australia: {
				center: {
					lat: -20.3034175184893,
					lng: 140.9765625
				},
				zoom: {
					actual: 4,
					max: 5,
					min: 3
				}
		},
		antarctica: {
				center: {
					lat: -75.49715731893083,
					lng: 67.1484375
				},
				zoom: {
					actual: 2,
					max: 5,
					min: 2
				}
		},
		world: {
				center: {
					lat: 40.094882122321145, 
					lng: -3.8232421874999996
				},
				zoom: {
					actual: 2,
					max: 5,
					min: 2
				}
		},
		africa: {
				center: {
					lat: 12.211180191503997, 
					lng: 17.2265625
				},
				zoom: {
					actual: 3,
					max: 5,
					min: 3
				}
		}
	};
	res.send(JSON.stringify(config[continent]));
    });

    app.get(urls.api.countries.geojson.url, function(req, res) {
	var continent = req.params.continent;
	var continents = {
		"world":  {},
		"europe": { continentName: "Europe" },
		"asia": { continentName: "Asia" },
		"northamerica": { continentName: "North America" },
		"southamerica": { continentName: "South America" },
		"australia": { continentName: "Australia" },
		"antarctica":   { continentName: "Antarctica" },
		"africa":   { continentName: "Africa" }
	};
	var query = continents[continent];

        Country.find(query, function(err, countries) {
            if (err) throw err;
	    var geojson = generateGEOJson(countries);
            return res.send(JSON.stringify(geojson));
        });
    });

};