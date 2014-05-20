var Backbone = require('Backbone');
var _ = require('lodash');

var ResultsView = require('../views/results')


var SearchView = Backbone.View.extend({

    events: {
        'keyup': 'onType'
    },

    DELAY: 200,

    initialize: function(options) {
        this.resultsView = new ResultsView({el: '#results'});
        this.books = options.books;
    },

    onType: function() {
        this.value = this.$el.val();
        if (this.value.length < 2)
            return;

        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout( _.bind(this.doSearch, this), this.DELAY);

    },

    doSearch: function() {
        this.timer = null;

        var books = this.books;

        books.url = 'http://turbine-staging-eu.herokuapp.com/books?q=' + this.value;
//        books.url = '/fixtures/books.json';

        books.fetch( {
            success: _.bind(this.resultsView.render, this.resultsView)
        } );

    }


});

module.exports = SearchView;