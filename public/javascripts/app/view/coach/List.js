Ext.define('TA.view.coach.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.coachlist',

    title : 'All coaches',

    initComponent: function() {
        this.addEvents('addcoachclick');

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
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];

        this.callParent(arguments);
    },

    onCoachAdd: function() {
        this.fireEvent('addcoachclick', this);
    }
});