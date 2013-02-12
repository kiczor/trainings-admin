Ext.define('TA.model.Session', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'trainingId', type: 'int'},
        {name: 'startDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'stopDate',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'trainingRoomId', type: 'int'}
    ],

    associations : [{
        type: 'belongsTo',
        model: 'TA.model.Training',
        primaryKey: 'id',
        foreignKey: 'trainingId',
        getterName: 'getTraining',
        setterName: 'setTraining',
        associationKey: 'training'
    }],

    proxy: {
        type: 'rest',
        url: 'trainingsession'
    }
});