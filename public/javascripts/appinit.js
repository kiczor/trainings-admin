Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'TA': 'javascripts/app'
    }
});


Ext.require('TA.reader.FastJsonSessions');

Ext.onReady(function() {
    new TA.app.Application();
});