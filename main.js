require.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        jquery: 'jquery/dist/jquery',
        underscore: 'underscore/underscore',
        backbone: 'backbone/backbone',
        text: 'requirejs-text/text'
    },
    shim: {
        // backbone file here is a non-AMD file
        backbone: {
            exports: 'Backbone',
            deps: ['underscore', 'jquery']
        }
    }
});

requirejs(['app/main']);