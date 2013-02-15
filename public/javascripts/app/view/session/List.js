Ext.define('TA.view.session.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sessionlist',

    roomsStore: null,

    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                'edit': function(editor, e) {
                    e.grid.onSessionEdited(e.record);
                }
            }
        })
    ],

    initComponent: function() {
        this.addEvents('addsessionclick', 'editsessionclick', 'deletesessionclick', 'sessionedited');

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
            {header: 'Training', dataIndex: 'trainingId', flex: 10, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return record.getTraining().get('name');
                }
            },
            {header: 'Starts at', xtype: 'datecolumn', format: 'Y-m-d (l)', dataIndex: 'startDate', flex: 4},
            {header: 'Ends at',  xtype: 'datecolumn', format: 'Y-m-d (l)', dataIndex: 'stopDate', flex: 4},
            {header: 'Room', dataIndex: 'trainingRoomId', flex: 4,
                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return record.getRoom().get('name');
                },
                editor: {
                    xtype: 'combobox',
                    store: this.roomsStore,

                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',

                    allowBlank: false
                }
            },
            {header: 'Coaches #', flex: 1, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return record.getCoaches().count();
            }
            },
            {header: 'Participants #', flex: 1, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return record.getParticipants().count();
            }
            },
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
    },

    onSessionEdited: function(record) {
        this.fireEvent('sessionedited', this, record);
    }
});