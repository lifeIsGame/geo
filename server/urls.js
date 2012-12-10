var base_url = require('./settings').base_url;

var urls = {
    base: {
        url: base_url
    },
    logout: {
        url: base_url + "logout"
    },
    login: {
        url: base_url + "login"
    },
    admin: {
        url: base_url + "admin"
    },
    maps: {
    	world: {
            discover: {
                url: base_url + "world/discover",
		title: "World Map Explore"
            },
            play: {
                url: base_url + "world/play",
		title: "World Map Play"
            }
        },
    	asia: {
            discover: {
                url: base_url + "asia/discover",
		title: "Asia Map Explore"
            }
        },
    	america: {
            discover: {
                url: base_url + "america/discover",
		title: "America Map Explore"
            }
        },
    	europe: {
            discover: {
                url: base_url + "europe/discover",
		title: "Europe Map Explore"
            }
        },
    	africa: {
            discover: {
                url: base_url + "africa/discover",
		title: "Africa Map Explore"
            }
        }
    },
    api: {
	maps: {
		config: {
			url: base_url + "api/maps/:continent/config"
		},
		world: {
			config: {
				url: base_url + "api/maps/world/config"
			}
		},
		southamerica: {
			config: {
				url: base_url + "api/maps/southamerica/config"
			}
		},
		northamerica: {
			config: {
				url: base_url + "api/maps/northamerica/config"
			}
		},
		asia: {
			config: {
				url: base_url + "api/maps/asia/config"
			}
		},
		europe: {
			config: {
				url: base_url + "api/maps/europe/config"
			}
		},
		australia: {
			config: {
				url: base_url + "api/maps/australia/config"
			}
		},
		africa: {
			config: {
				url: base_url + "api/maps/africa/config"
			}
		}
	},

        countries: {
	    geojson: {
                url: base_url + "api/countries/:continent/geojson"
	    },
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
