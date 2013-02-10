Ext.define('TA.store.Sessions', {
    extend: 'Ext.data.Store',
    model: 'TA.model.Session',

    proxy: {
        type: 'ajax',
        url: 'trainingsessions?relations=true'
    }
});