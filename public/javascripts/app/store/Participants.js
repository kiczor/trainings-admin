Ext.define('TA.store.Participants', {
    extend: 'Ext.data.Store',
    model: 'TA.model.Participant',

    proxy: {
        type: 'ajax',
        url: 'trainingparticipants'
    }
});