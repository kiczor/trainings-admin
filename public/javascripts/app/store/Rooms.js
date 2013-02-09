Ext.define('TA.store.Rooms', {
    extend: 'Ext.data.Store',

    model: 'TA.model.Room',

    proxy: {
        type: 'ajax',
        url: 'trainingrooms'
    }
});