var fs = require('fs');

module.exports = function(app){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file.search(".js") != (file.length-3) || file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
    });
};
