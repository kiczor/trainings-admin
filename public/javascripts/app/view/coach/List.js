Ext.define('TA.view.coach.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.coachlist',

    title : 'All coaches',

    initComponent: function() {
        this.addEvents('addcoachclick', 'editcoachclick');

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Add coach',
                scope: this,
                handler: this.onCoachAdd
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
                        this.onCoachEdit(record);
                    },
                    scope: this
                }]
            }
        ];

        this.callParent(arguments);
    },

    onCoachAdd: function() {
        this.fireEvent('addcoachclick', this);
    },

    onCoachEdit: function(record) {
        this.fireEvent('editcoachclick', this, record);
    }
});