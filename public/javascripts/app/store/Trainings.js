Ext.define('TA.store.Trainings', {
    extend: 'Ext.data.Store',
    model: 'TA.model.Training',

    proxy: {
        type: 'ajax',
        url: 'trainings?relations=true'
    }
});