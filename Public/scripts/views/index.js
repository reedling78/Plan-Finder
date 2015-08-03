(function () {

    define([], function () {

        var _view = {};

        _view.View = Backbone.View.extend({
            el: $('body'),

            initialize: function () {
                console.log('Index View Initialized');
                this.$el.fadeIn('200');
            },

        });

        return _view;

    });

})();