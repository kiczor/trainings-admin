Ext.define('TA.view.room.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.roomlist',

    title : 'All rooms',

    roomFloorsStore: null,

    initComponent: function() {
        this.addEvents('addroomclick');

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Add room',
                scope: this,
                handler: this.onRoomAdd
            }]
        }];

        this.columns = [
            {xtype: 'rownumberer', text: '#'},
            {header: 'Name',  dataIndex: 'name', flex: 1},
            {header: 'Floor', dataIndex: 'floor',
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return this.roomFloorsStore.findRecord('value', value).get('text');
                }
            },
            {header: 'Space #', dataIndex: 'space'}
        ];

        this.callParent(arguments);
    },

    onRoomAdd: function() {
        this.fireEvent('addroomclick', this);
    }
});