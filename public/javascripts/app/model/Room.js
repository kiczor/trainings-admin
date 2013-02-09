Ext.define('TA.model.Room', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'space', type: 'int'},
        {name: 'floor', type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url: 'trainingroom'
    }
});