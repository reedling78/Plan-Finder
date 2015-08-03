(function () {

    define(['modules/resultsApp', 'backbone', 'plugins/jquery.mmenu', 'plugins/jquery.multiselect'], function (App) {

        var _view = {};

        _view.View = Backbone.View.extend({
            el: $('body'),

            initialize: function () {
                console.log('Results View Initialized');

                App.i.Views.SlideMenu = new App.Views.SlideMenu();
                App.i.Views.Modal = new App.Views.Modal();
                App.i.Views.Filter = new App.Views.Filter();
                App.i.Views.FAQ = new App.Views.FAQ();
                App.i.Views.Results = new App.Views.Results();

                this.$el.fadeIn();
            },

            events: {
                'click button[context="ToggleMenu"]' : 'openSlideMenu',
                'click button[context="StartOver"]' : 'startOver',
                'click button[context="FAQ"]': 'openFAQ'
            },

            openFAQ: function(){
                console.log('open faq');
                App.i.Views.FAQ.$el.trigger("open");
            },

            openSlideMenu: function(){
                App.i.Views.SlideMenu.$el.trigger("open");
            },

            startOver: function(){
                window.location = "index_bold.html";
            }
        });

        return _view;

    });

})();