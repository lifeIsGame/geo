var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Mixed    = Schema.Types.Mixed;

var CountrySchema = new Schema({
   countryName: {
      	type: String,
       	required: true
   },
   isoAlpha3: {
       	type: String,
       	required: true
   },
   countryCode: {
	type: String,
	required: true
   },
   geometry: {
	required: false,
	type: Mixed 
   }
});

module.exports = mongoose.model('country', CountrySchema);
