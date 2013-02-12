Ext.define('TA.view.session.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sessionlist',

    title: 'All sessions',

    initComponent: function() {
        this.addEvents('addsessionclick', 'editsessionclick', 'deletesessionclick');

        this.dockedItems = [{
            xtype:'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Add session',
                scope: this,
                handler: this.onSessionAdd
            }]
        }];

        this.columns = [
            {xtype: 'rownumberer', text: '#'},
            {header: 'Training', dataIndex: 'trainingId', flex: 1, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return record.getTraining().get('name');
                }
            },
            {header: 'Starts at', xtype: 'datecolumn', format: 'Y-m-d (l)', dataIndex: 'startDate', flex: 1},
            {header: 'Ends at',  xtype: 'datecolumn', format: 'Y-m-d (l)', dataIndex: 'stopDate', flex: 1},
            {header: 'Room', dataIndex: 'trainingRoomId', flex: 1},
            {
                xtype:'actioncolumn',
                header: 'Actions',
                align: 'center',
                width:50,
                items: [{
                    icon: 'images/edit-icon.png',  // Use a URL in the icon config
                    handler: function(grid, rowIndex, colIndex, item, event, record) {
                        this.onSessionEdit(record);
                    },
                    scope: this
                }, {
                    icon: 'images/delete-icon.png',
                    handler: function(grid, rowIndex, colIndex, item, event, record) {
                        this.onSessionDelete(record);
                    },
                    scope: this
                }]
            }
        ];

        this.callParent(arguments);
    },

    onSessionAdd: function() {
        this.fireEvent('addsessionclick', this);
    },

    onSessionEdit: function(record) {
        this.fireEvent('editsessionclick', this, record);
    },

    onSessionDelete: function(record) {
        this.fireEvent('deletesessionclick', this, record);
    }
});