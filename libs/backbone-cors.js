var Backbone = require('Backbone');

var _ = require('lodash');

var $ = require('jquery');
Backbone.$ = $;

Backbone.sync = _.wrap(Backbone.sync, function(sync, method, model, options) {
    if (!options.xhrFields) {
        options.xhrFields = {withCredentials:true};
    }

    options.headers = options.headers || {};

    // credentials is a string that looks like 'Basic d2Vwb3c6McriNzk3YZgvZTNkMTkzOGE4MTk3NjMwMDkzNmMwZGI='
//    options.headers['Authorization'] = credentials;

    sync(method, model, options);
});

module.exports = Backbone;