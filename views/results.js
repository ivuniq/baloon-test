var Backbone = require('Backbone');

var template = require('../templates/results.hbs');

var _ = require('lodash');

var ResultsView = Backbone.View.extend({

    events: {
        'dragstart div': 'onDrag'
    },

    onDrag: function(event) {
        var dt = event.originalEvent.dataTransfer;
        dt.effectAllowed = 'copy';
        dt.setData('id', event.currentTarget.getAttribute('id')); 
    },

    render: function(collection) {
        this.$el.html(template({ books: collection.toJSON() }));
        this.$el.find('img').error(_.bind(this.addPlaceholder, this, collection));
    },

    addPlaceholder: function(collection, event) {
        var placeholder = 'http://placekitten.com/96/120',
            el = event.target,
            coverEl = el.parentNode,
            model = collection.findWhere({ udid: coverEl.getAttribute('id') });
        model.set('cover_image_url', placeholder);
        el.setAttribute('src', placeholder);
    }

});

module.exports = ResultsView;