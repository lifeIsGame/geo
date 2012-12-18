var qs       = require('querystring'),
    settings = require('../config/settings'),
    relative_urls = require("../config/urls"),
    urls_constructor = require("../common/urls_constructor"),
    http     = require('request'),
    should   = require('should');

describe("Json API tests", function() {
    var base = "http://" + settings.server_hostname + ":" + settings.server_port;
    var urls = urls_constructor(settings.base_url, relative_urls);

    describe("API call to get the continent configuration should work", function(done) {
        it('should return an array with seven entries', function(done){
            http.get(base + urls.api.countries.config.replace(":continent", "world"), function(err, res, body) {
                if (err) {
                    done(err);
                } else {
                    res.statusCode.should.be.equal(200);
                    should.exist(body);
                    var obj = JSON.parse(body);
                    obj.should.be.a('object');
                    obj.should.have.property('center');
                    obj.should.have.property('zoom');
                    obj.center.should.have.property('lat');
                    obj.center.should.have.property('lng');
                    done();
                }
            });
        });
    });
});

/*
        it('should return a 500 code if the parameters are not correct', function(done){
            var params = { vpn_ip: "1.0.0.5", dundi_uid: "90:ma:la:4c:7b:8C" };
            var url = base + urls.api.node.getremote.info.url + "/" + params.vpn_ip + "?" + qs.stringify(params);
            http.get(url, function(err, res, body) {
                if (err) {
                    done(err);
                } else {
                    res.statusCode.should.be.equal(500);
                    done();
                }
            });
        });

        it('should return a 200 code if the parameters are correct', function(done){
            var params = { vpn_ip: "1.0.0.5", dundi_uid: "90:fb:a6:4c:7b:8C" };
            var url = base + urls.api.node.getremote.info.url + "/" + params.vpn_ip + "?" + qs.stringify(params);
            http.get(url, function(err, res, body) {
                if (err) {
                    done(err);
                } else {
                    res.statusCode.should.be.equal(200);
                    should.exist(body);
                    var obj = JSON.parse(body);
                    obj.should.be.a('object');
                    obj.should.have.property('vpn_ip');
                    done();
                }
            });
        });
    });

    describe("API call to get remote admin info", function(done) {
        it('should return a 404 code if no parameters passed', function(done){
            http.get(base + urls.api.node.getremote.admininfo.url, function(err, res, body) {
                if (err) {
                    done(err);
                } else {
                    res.statusCode.should.be.equal(404);
                    done();
                }
            });
        });

        it('should return a 500 code if the parameters are not correct', function(done){
            var params = { vpn_ip: "1.0.0.5", dundi_uid: "90:ma:la:4c:7b:8C" };
            var url = base + urls.api.node.getremote.admininfo.url + "/" + params.vpn_ip + "?" + qs.stringify(params);
            http.get(url, function(err, res, body) {
                if (err) {
                    done(err);
                } else {
                    res.statusCode.should.be.equal(500);
                    done();
                }
            });
        });

        it('should return a 200 code if the parameters are correct', function(done){
            var params = { vpn_ip: "1.0.0.5", dundi_uid: "90:fb:a6:4c:7b:8C" };
            var url = base + urls.api.node.getremote.admininfo.url + "/" + params.vpn_ip + "?" + qs.stringify(params);
            http.get(url, function(err, res, body) {
                if (err) {
                    done(err);
                } else {
                    res.statusCode.should.be.equal(200);
                    should.exist(body);
                    var obj = JSON.parse(body);
                    obj.should.be.a('object');
                    obj.should.have.property('email');
                    done();
                }
            });
        });
    });

    describe("API call to post a new link to this node", function(done) {
        var url = base + urls.api.link.add.url;
        it('should return a 404 code if no parameters passed', function(done){
            http.post(url, function(err, res, body) {
                if (err) {
                    done(err);
                } else {
                    res.statusCode.should.be.equal(404);
                    done();
                }
            });
        });
        it('should return a 500 code if the vpn_ip data is incorrect', function(done){
            var data = JSON.stringify({ dundi_uid: '00:11:22:33:44:55' });
            http.post({ url: url + "/10.228.144.163", json: true, body: {data: data}}, function(err, res, body) {
                if (err) {
                    done(err);
                } else {
                    res.statusCode.should.be.equal(500);
                    done();
                }
            });
        });
        it('should return a 200 code if the vpn_ip data is correct', function(done){
            var data = JSON.stringify({ dundi_uid: '90:fb:a6:4c:7b:8c' });
            http.post({url: url + "/1.0.0.5", json: true, body: {data: data}}, function(err, res, body) {
                if (err) {
                    done(err);
                } else {
                    res.statusCode.should.be.equal(200);
                    done();
                }
            });
        });
    });
});
*/
