Ext.define('TA.model.Session', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'trainingId', type: 'int'},
        {name: 'startDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'stopDate',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'trainingRoomId', type: 'int'}
    ],

    proxy: {
        type: 'rest',
        url: 'trainingsession'
    }
});