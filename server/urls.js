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
    }
};

module.exports = urls
