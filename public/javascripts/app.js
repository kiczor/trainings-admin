Ext.define('TA.app.Application', {
    extend: 'Ext.app.Application',
    name: 'TA',

    appFolder: 'javascripts/app',


    launch: function() {
        Ext.create('Ext.Viewport', {
            layout : 'fit',
            html: 'This is awsome app :)'
        });
    }
});