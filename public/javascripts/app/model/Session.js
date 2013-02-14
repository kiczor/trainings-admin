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
    },{
        type: 'belongsTo',
        model: 'TA.model.Room',
        primaryKey: 'id',
        foreignKey: 'trainingRoomId',
        getterName: 'getRoom',
        setterName: 'setRoom',
        associationKey: 'trainingRoom'
    },{
        model: 'TA.model.Coach',
        type: 'hasMany',
        name: 'getCoaches',
        primaryKey: 'id',
        foreignKey: 'trainingSessionId',
        associationKey: 'coaches'
    },{
        model: 'TA.model.Participant',
        type: 'hasMany',
        name: 'getParticipants',
        primaryKey: 'id',
        foreignKey: 'trainingSessionId',
        associationKey: 'participants'
    }],

    proxy: {
        type: 'rest',
        url: 'trainingsession'
    }
});