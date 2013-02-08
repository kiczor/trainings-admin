Ext.define('TA.app.Application', {
    extend: 'Ext.app.Application',
    name: 'TA',

    appFolder: 'javascripts/app',

    requires: ['TA.model.Coach'],

    autoCreateViewport: true

});