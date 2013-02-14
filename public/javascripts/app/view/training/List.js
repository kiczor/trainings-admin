Ext.define('TA.view.training.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.traininglist',

    title : 'All trainings',

    initComponent: function() {
        this.addEvents('addtrainingclick', 'edittrainingclick', 'deletetrainingclick');

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Add training',
                scope: this,
                handler: this.onTrainingAdd
            }]
        }];

        this.columns = [
            {xtype: 'rownumberer', text: '#'},
            {header: 'Name',  dataIndex: 'name',  flex: 10},
            {header: 'Cost', dataIndex: 'cost', flex: 1, align: 'right', renderer: Ext.util.Format.usMoney},
            {header: 'Days #', dataIndex: 'days', flex: 1, align: 'right'},
            {header: 'Sessions #', flex: 1, align: 'right', renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                    return record.getSessions().count();
                }
            },
            {
                xtype:'actioncolumn',
                header: 'Actions',
                align: 'center',
                width:50,
                menuDisabled: true,
                draggable: false,
                items: [{
                    icon: 'images/edit-icon.png',  // Use a URL in the icon config
                    handler: function(grid, rowIndex, colIndex, item, event, record) {
                        this.onTrainingEdit(record);
                    },
                    scope: this
                }, {
                    icon: 'images/delete-icon.png',
                    handler: function(grid, rowIndex, colIndex, item, event, record) {
                        this.onTrainingDelete(record);
                    },
                    scope: this
                }]
            }
        ];

        this.callParent(arguments);
    },

    onTrainingAdd: function() {
        this.fireEvent('addtrainingclick', this);
    },

    onTrainingEdit: function(record) {
        this.fireEvent('edittrainingclick', this, record);
    },

    onTrainingDelete: function(record) {
        this.fireEvent('deletetrainingclick', this, record);
    }
});