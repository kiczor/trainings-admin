Ext.define('TA.view.session.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sessionlist',

    title: 'All sessions',

    addSessionBtn: null,
    editSessionBtn: null,
    deleteSessionBtn: null,

    initComponent: function() {
        this.addEvents('addsessionclick', 'editsessionclick', 'deletesessionclick');

        this.addSessionBtn = Ext.create('Ext.button.Button', {
            text: 'Add session',
            listeners: {
                scope: this,
                click: this.onSessionAdd
            }
        });



        this.editSessionBtn = Ext.create('Ext.Button', {
            text: 'Edit session',
            disabled: true,
            listeners: {
                scope: this,
                click: this.onSessionEditSelected
            }
        });

        this.deleteSessionBtn = Ext.create('Ext.Button', {
            text: 'Delete session',
            disabled: true,
            listeners: {
                scope: this,
                click: this.onSessionDeleteSelected
            }
        });

        this.dockedItems = [{
            xtype:'toolbar',
            dock: 'top',
            items: [this.addSessionBtn, this.editSessionBtn, this.deleteSessionBtn]
        }];

        this.columns = [
            {xtype: 'rownumberer', text: '#'},
            {header: 'Training', dataIndex: 'trainingId', flex: 10, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return record.getTraining().get('name');
                }
            },
            {header: 'Starts at', xtype: 'datecolumn', format: 'Y-m-d (l)', dataIndex: 'startDate', flex: 4},
            {header: 'Ends at',  xtype: 'datecolumn', format: 'Y-m-d (l)', dataIndex: 'stopDate', flex: 4},
            {header: 'Room', dataIndex: 'trainingRoomId', flex: 4, renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return record.getRoom().get('name');
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

        this.getSelectionModel().on('selectionchange', this.onSelectionModelSelectionChange, this);
    },

    destroy: function() {
        this.getSelectionModel().un('selectionchange', this.onSelectionModelSelectionChange, this);
        this.callParent();
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

    onSelectionModelSelectionChange: function(sm, selected, eOpts) {
        if(selected.length) {
            this.editSessionBtn.enable();
            this.deleteSessionBtn.enable();
        }
        else {
            this.editSessionBtn.disable();
            this.deleteSessionBtn.disable();
        }
    },

    onSessionEditSelected: function() {
        var sm = this.getSelectionModel();
        var records = sm.getSelection();

        if(records.length > 0) {
            this.onSessionEdit(records[0]);
        }
    },

    onSessionDeleteSelected: function() {
        var sm = this.getSelectionModel();
        var records = sm.getSelection();

        if(records.length > 0) {
            this.onSessionDelete(records[0]);
        }
    }
});