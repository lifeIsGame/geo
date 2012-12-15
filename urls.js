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
        discover: {
            url: base_url + "discover/",
            title: "World Map Explore"
        },
        play: {
            url: base_url + "play/",
            title: "World Map Play"
        }
    },
    api: {
	maps: {
		config: {
			url: base_url + "api/maps/:continent/config"
		}
	},

        countries: {
            url: base_url + "api/countries/:continent",

            geojson: {
                url: base_url + "api/countries/:continent/geojson"
            }
        }
    }
};

module.exports = urls;
