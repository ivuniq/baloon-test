var Backbone = require('../libs/backbone-cors');
var Book = require('../models/book');

var BaseCollection = require('../collections/base');


var Books = BaseCollection.extend({
	model: Book
});

module.exports = Books;