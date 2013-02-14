Ext.define('TA.model.Training', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'cost', type: 'int'},
        {name: 'days', type: 'int'}
    ],

    associations: [{
        type: 'hasMany',
        model: 'TA.model.Session',
        name: 'getSessions',
        primaryKey: 'id',
        foreignKey: 'trainingId',
        associationKey: 'sessions'
    }],

    proxy: {
        type: 'rest',
        url: 'training'
    }
});