var Backbone = require('Backbone');

var _ = require('lodash');

var BaseCollection = Backbone.Collection.extend({
	storageKey: 'baloon-shelf',
	save: function() {
		localStorage[this.storageKey] = JSON.stringify(this.toJSON());
	},
	restore: function() {
		if (localStorage[this.storageKey]) {
			var models = JSON.parse(localStorage[this.storageKey]);
			_.each(models, _.bind(function(modelJson) {
				this.add(new this.model(modelJson));
			}, this));
		}
	},
    toJSON: function() {
        return _.map(this.models, function(el){
            return el.toJSON();
        })
    }	
});

module.exports = BaseCollection;