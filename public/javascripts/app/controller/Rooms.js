Ext.define('TA.controller.Rooms', {
    extend: 'Ext.app.Controller',

    models: [
        'Room'
    ],

    stores: [
        'Rooms'
    ],

    views: [
        'room.List'
    ],

    refs: [
        {
            ref: 'list',
            selector: '',
            xtype: 'roomlist',
            autoCreate: true
        }
    ],

    init: function() {
        this.callParent();
        this.getStore('Rooms').load();
    },

    onLaunch: function() {
        this.callParent();
        this.application.getViewport().add(this.getList());
        this.getList().reconfigure(this.getStore('Rooms'));
    }
});