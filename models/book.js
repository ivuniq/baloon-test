var Backbone = require('../libs/backbone-cors');

var Book = Backbone.Model.extend({
	idAttribute: 'udid',
	toJSON: function() {
        var json = Backbone.Model.prototype.toJSON.apply(this, arguments);		
        json.cover_image_url_small = json.cover_image_url.replace('LARGE', 'MEDIUM');
        return json;
	}
});

module.exports = Book;