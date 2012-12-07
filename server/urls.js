var base_url = require('./settings').base_url;

var urls = {
    base: {
        url: base_url
    },
    logout: {
        url: base_url + "/logout"
    },
    login: {
        url: base_url + "/login"
    },
    admin: {
        url: base_url + "/admin"
    },
    maps: {
    	world: {
            explore: {
                url: base_url + "world/explore",
		title: "World Map Explore"
            }
        },
    	asia: {
            explore: {
                url: base_url + "asia/explore",
		title: "Asia Map Explore"
            }
        },
    	america: {
            explore: {
                url: base_url + "america/explore",
		title: "America Map Explore"
            }
        },
    	europe: {
            explore: {
                url: base_url + "europe/explore",
		title: "Europe Map Explore"
            }
        },
    	africa: {
            explore: {
                url: base_url + "africa/explore",
		title: "Africa Map Explore"
            }
        }
    },
    api: {
        countries: {
	    world: {
            	url: base_url + "api/countries/world",
            	geojson: {
                    url: base_url + "api/countries/world/geojson"
            	}
            },
	    asia: {
            	url: base_url + "api/countries/asia",
            	geojson: {
                    url: base_url + "api/countries/asia/geojson"
            	}
            },
	    america: {
            	url: base_url + "api/countries/america",
            	geojson: {
                    url: base_url + "api/countries/america/geojson"
            	}
            },
	    europe: {
            	url: base_url + "api/countries/europe",
            	geojson: {
                    url: base_url + "api/countries/europe/geojson"
            	}
            },
	    africa: {
            	url: base_url + "api/countries/africa",
            	geojson: {
                    url: base_url + "api/countries/africa/geojson"
            	}
            }
        }
    }
};

module.exports = urls
