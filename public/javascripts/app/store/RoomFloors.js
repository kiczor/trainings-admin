Ext.define('TA.store.RoomFloors', {
    extend: 'Ext.data.ArrayStore',
    storeId: 'RoomFloors',
    fields: ['value', 'text'],

    autoLoad: true,

    data: [['I', '1st'],['II', '2nd'],['III', '3rd'],['IV', '4th'],['V', '5th']]
});