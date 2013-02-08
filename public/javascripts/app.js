Ext.define('TA.app.Application', {
    extend: 'Ext.app.Application',
    name: 'TA',

    appFolder: 'javascripts/app',

    viewport: null,

    controllers: ['Coaches'],

    autoCreateViewport: true,

    getViewport: function() {
        this.viewport= this.viewport || Ext.ComponentQuery.query('viewport panel')[0];
        return this.viewport;
    }
});