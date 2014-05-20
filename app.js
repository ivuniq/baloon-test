var booksCollection = require('./collections/books');

var books = new booksCollection;

var ShelfView = require('./views/shelf');
var SearchView = require('./views/search');

document.addEventListener("DOMContentLoaded", function() {

    var shelfView = new ShelfView({ el: '#shelf', books: books });
    var searchView = new SearchView({ el: '#search', books: books });

});



//console.log(111, booksCollection);