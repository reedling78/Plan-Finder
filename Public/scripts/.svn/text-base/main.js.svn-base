require.config({
    baseUrl: 'Public/scripts',
    urlArgs: "bust=" +  (new Date()).getTime(),
    paths: {
        jquery: 'libs/jquery-1.10.2',
        jqueryui: 'libs/jquery-ui-1.10.3',
        backbone: 'libs/backbone-1.0',
        underscore: 'libs/underscore-1.5.1',
        bootstrap: 'libs/bootstrap-3.0.2/bootstrap.min'
    }
});

requirejs.onError = function(err) {
     console.log("error: " + err);
    if (err.requireType === 'timeout') {
        // tell user
        console.log("error: " + err);
    } else {
        throw err;
    }
};

require(['jquery', 'underscore'], function($, _) {
    require(['backbone', 'bootstrap'], function() {
        var bodyId = $('body').attr('id');

        if(bodyId){
            require(['views/' + bodyId], function(view) {
                var _view = new view.View();
            });
        }
        
    });
});