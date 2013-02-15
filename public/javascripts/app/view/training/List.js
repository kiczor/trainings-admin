Ext.define('TA.view.training.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.traininglist',

    title : 'All trainings',

    editBtn: null,
    deleteBtn: null,

    initComponent: function() {
        this.addEvents('addtrainingclick', 'edittrainingclick', 'deletetrainingclick');

        this.editBtn = Ext.create('Ext.Button', {
            text: 'Edit training',
            disabled: true,
            scope: this,
            handler: this.onTrainingEditSelected
        });

        this.deleteBtn = Ext.create('Ext.Button', {
            text: 'Delete trainings',
            disabled: true,
            scope: this,
            handler: this.onTrainingDeleteSelected
        });

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Add training',
                scope: this,
                handler: this.onTrainingAdd
            },
            this.editBtn,
            this.deleteBtn
            ]
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

        this.getSelectionModel().on('selectionchange', this.onSelectionModelSelectionChange, this);
    },

    destroy: function() {
        this.getSelectionModel().un('selectionchange', this.onSelectionModelSelectionChange, this);
        this.callParent();
    },

    onTrainingAdd: function() {
        this.fireEvent('addtrainingclick', this);
    },

    onTrainingEdit: function(record) {
        this.fireEvent('edittrainingclick', this, record);
    },

    onTrainingDelete: function(record) {
        this.fireEvent('deletetrainingclick', this, record);
    },

    onSelectionModelSelectionChange: function(sm, selected, eOpts) {
        if(selected.length) {
            this.editBtn.enable();
            this.deleteBtn.enable();
        }
        else {
            this.editBtn.disable();
            this.deleteBtn.disable();
        }
    },

    onTrainingEditSelected: function() {
        var sm = this.getSelectionModel();
        var records = sm.getSelection();

        if(records.length > 0) {
            this.onTrainingEdit(records[0]);
        }
    },

    onTrainingDeleteSelected: function() {
        var sm = this.getSelectionModel();
        var records = sm.getSelection();

        if(records.length > 0) {
            this.onTrainingDelete(records[0]);
        }
    }
});