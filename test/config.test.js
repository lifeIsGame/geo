var settings = require('../config/settings')
  , http     = require('request')
  , fs       = require('fs')
  , should   = require('should');

describe("The config file settings.json and urls.json are correct", function(){

    describe("The file settings.json must have all necessary properties defined", function(done) {
        it('should have the server_hostname and server_host defined', function(done){
            settings.should.have.property("server_hostname");
            settings.server_hostname.should.not.equal("");
            settings.should.have.property("server_port");
            settings.server_port.should.not.equal("");
            done();
        });

        it("should have base_url and it must start with /", function(done){
            settings.should.have.property("base_url");
            settings.base_url.substr(0,1).should.equal("/");
            done();
        });
    });

    describe("The file urls.json must have all necessary properties defined", function(done) {
        var urls = require("../config/urls");
        it('should have the login url defined', function(done){
            urls.should.have.property("login");
            urls.login.should.not.equal("");
            done();
        });

        it('should have the logout url defined', function(done){
            urls.should.have.property("logout");
            urls.logout.should.not.equal("");
            done();
        });
    });

});
