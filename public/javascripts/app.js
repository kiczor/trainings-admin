Ext.define('TA.app.Application', {
    extend: 'Ext.app.Application',
    name: 'TA',

    appFolder: 'javascripts/app',

    requires: [
        'TA.model.Coach',
        'TA.store.Coaches'
    ],

    autoCreateViewport: true

});