Ext.define('TA.view.room.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.roomlist',

    title : 'All rooms',

    roomFloorsStore: null,

    initComponent: function() {
        this.addEvents('addroomclick', 'editroomclick', 'deleteroomclick');

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
            {header: 'Space #', dataIndex: 'space'},
            {
                xtype:'actioncolumn',
                header: 'Actions',
                align: 'center',
                width: 50,
                menuDisabled: true,
                draggable: false,
                items: [{
                    icon: 'images/edit-icon.png',  // Use a URL in the icon config
                    handler: function(grid, rowIndex, colIndex, item, event, record) {
                        this.onRoomEdit(record);
                    },
                    scope: this
                },{
                    icon: 'images/delete-icon.png',
                    handler: function(grid, rowIndex, colIndex, item, event, record) {
                        this.onRoomDelete(record);
                    },
                    scope: this
                }]
            }
        ];

        this.callParent(arguments);
    },

    onRoomAdd: function() {
        this.fireEvent('addroomclick', this);
    },

    onRoomEdit: function(record) {
        this.fireEvent('editroomclick', this, record);
    },

    onRoomDelete: function(record) {
        this.fireEvent('deleteroomclick', this, record);
    }
});