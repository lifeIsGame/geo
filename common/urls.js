"use strict";

var urls     = require('../urls'),
    settings = require('../settings'),
    _und     = require('underscore');

function baseurls() {

  function mapurl(arr, baseurl) {
      var newarr = {};
      _und.map(arr, function(val, key) {
          if (typeof val === "string") {
              newarr[key] = settings.base_url + val;
          } else {
              newarr[key] = mapurl(val, baseurl);
	  }
      });
      return newarr;
  }

  var newurls = mapurl(urls, settings.base_url);

  newurls.base = settings.base_url;
  return newurls;
}

module.exports = baseurls();
