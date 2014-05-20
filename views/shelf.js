var Backbone = require('Backbone');

var shelfCollection = require('../collections/shelf');

var template = require('../templates/results.hbs');

var _ = require('lodash');

var ShelfView = Backbone.View.extend({

    events: {
        'dragover': 'dragover',
        'drop': 'dropOnShelf',
        'dragstart div': 'onDrag',
        'dblclick div': 'removeBook'
    },

    initialize: function(options) {
        this.collection = new shelfCollection();
        this.collection.restore();
        this.collection.on('remove add change', _.bind(this.onCollectionSync, this));
        this.render(this.collection);
        this.books = options.books;
    },

    dragover: function(event) {
        if (event.preventDefault) 
            event.preventDefault(); 
        this.className = 'over';
        return false;
    },

    dropOnShelf: function(event) {
        var id = event.originalEvent.dataTransfer.getData('id');
        var book = this.books.findWhere({ udid: id }) || this.collection.findWhere({ udid: id });
        if (book) {
            this.collection.add(book);
        }
        var droppedOnId = event.originalEvent.target.parentNode.getAttribute('id');
        if (book && droppedOnId) {
            var droppedOnBook = this.collection.findWhere({ udid: droppedOnId });
            this.reorder(book, droppedOnBook);
            this.collection.trigger('change');
        }
    },

    reorder: function(book1, book2) {
        this.collection.swapItems(book1, book2);
    },

    onDrag: function(event) {
        var dt = event.originalEvent.dataTransfer;
        dt.effectAllowed = 'copy';
        dt.setData('id', event.currentTarget.getAttribute('id')); 
    },

    render: function(collection) {
        this.$el.html(template({ books: collection.toJSON() }));
    },

    removeBook: function(event) {
        var model = this.collection.findWhere({ udid: event.currentTarget.getAttribute('id') });
        this.collection.remove(model);
    },

    onCollectionSync: function() {
        console.log('%s | Shelf updated | ', new Date(), this.collection.toJSON())
        this.collection.save();
        this.render(this.collection);
    }


});

module.exports = ShelfView;