Ext.define('TA.view.participant.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.participantlist',

    title : 'All participants',

    initComponent: function() {
        this.addEvents('addparticipantclick', 'editparticipantclick', 'deleteparticipantclick');

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Add participant',
                scope: this,
                handler: this.onParticipantAdd
            }]
        }];

        this.columns = [
            {xtype: 'rownumberer', text: '#'},
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Surname', dataIndex: 'surname', flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1},
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
                        this.onParticipantEdit(record);
                    },
                    scope: this
                },{
                    icon: 'images/delete-icon.png',  // Use a URL in the icon config
                    handler: function(grid, rowIndex, colIndex, item, event, record) {
                        this.onParticipantDelete(record);
                    },
                    scope: this
                }]
            }
        ];

        this.callParent(arguments);
    },

    onParticipantAdd: function() {
        this.fireEvent('addparticipantclick', this);
    },

    onParticipantEdit: function(record) {
        this.fireEvent('editparticipantclick', this, record);
    },

    onParticipantDelete: function(record) {
        this.fireEvent('deleteparticipantclick', this, record);
    }
});