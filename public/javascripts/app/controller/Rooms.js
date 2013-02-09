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
    },

    onLaunch: function() {
        this.callParent();
        this.getList().reconfigure(this.getStore('Rooms'));
    },

    execute: function(params) {
        this.getStore('Rooms').load();
        return this.getList();
    }
});