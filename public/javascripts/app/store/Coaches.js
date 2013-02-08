Ext.define('TA.store.Coaches', {
    extend: 'Ext.data.Store',
    model: 'TA.model.Coach',

    proxy: {
        type: 'ajax',
        url: 'coaches'
    }
});