Ext.define('TA.model.Coach', {
    extend: 'Ext.data.Model',

    fields: [
        {name:'id',         type: 'int'},
        {name: 'name',      type: 'string'},
        {name: 'surname',   type: 'string'},
        {name: 'email',     type: 'string'}
    ],

    proxy: {
        type: 'rest',
        url: 'coach'
    }
});