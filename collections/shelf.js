var Backbone = require('Backbone');
//Backbone.LocalStorage = require('backbone.localstorage');

var Book = require('../models/book');

var BaseCollection = require('../collections/base');

var Shelf = BaseCollection.extend({
	model: Book,
    swapItems : function(el1, el2) {
    	var index1 = this.models.indexOf(el1);
    	var index2 = this.models.indexOf(el2);
        this.models[index1] = this.models.splice(index2, 1, this.models[index1])[0];
    }    
});

module.exports = Shelf;