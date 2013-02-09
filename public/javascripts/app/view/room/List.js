Ext.define('TA.view.room.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.roomlist',

    title : 'All rooms',

    initComponent: function() {
        this.columns = [
            {xtype: 'rownumberer', text: '#'},
            {header: 'Name',  dataIndex: 'name', flex: 1},
            {header: 'Floor', dataIndex: 'floor'},
            {header: 'Space #', dataIndex: 'space'}
        ];

        this.callParent(arguments);
    }
});