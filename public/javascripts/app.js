Ext.define('TA.app.Application', {
    extend: 'Ext.app.Application',
    name: 'TA',

    appFolder: 'javascripts/app',

    requires: [
        'TA.model.Coach',
        'TA.store.Coaches',
        'TA.view.coach.List'
    ],

    autoCreateViewport: true,

    launch: function() {
        var coachesStore = this.getStore('Coaches');

        var coachesList = Ext.create('TA.view.coach.List', {
            store: coachesStore
        });

        var viewport = Ext.ComponentQuery.query('viewport panel')[0];

        viewport.add(coachesList);

        coachesStore.load();
    }

});