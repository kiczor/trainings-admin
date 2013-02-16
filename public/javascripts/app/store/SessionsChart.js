Ext.define('TA.store.SessionsChart', {
    extend: 'Ext.data.ArrayStore',

    fields: [
        { name: 'name', type: 'string' },
        { name: 'participantsCount', type: 'int' },
        { name: 'revenue', type: 'int' }
    ]
});