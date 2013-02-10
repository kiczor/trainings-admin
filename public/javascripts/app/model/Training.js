Ext.define('TA.model.Training', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'cost', type: 'int'},
        {name: 'days', type: 'int'}
    ],

    proxy: {
        type: 'rest',
        url: 'training'
    }
});