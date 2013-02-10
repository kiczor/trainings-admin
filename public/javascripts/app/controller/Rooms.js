Ext.define('TA.controller.Rooms', {
    extend: 'Ext.app.Controller',

    models: [
        'Room'
    ],

    stores: [
        'Rooms'
    ],

    views: [
        'room.List',
        'room.Add'
    ],

    refs: [
        {
            ref: 'list',
            selector: '',
            xtype: 'roomlist',
            autoCreate: true
        },
        {
            ref: 'add',
            selector: '',
            xtype: 'roomadd',
            autoCreate: true
        }
    ],

    init: function() {
        this.callParent();
    },

    onLaunch: function() {
        this.callParent();
        this.getList().on('addroomclick', this.consumeListAddRoomClick, this);
        this.getList().reconfigure(this.getStore('Rooms'));
    },

    destroy: function() {
        this.getList().un('addroomclick', this.consumeListAddRoomClick, this);
        this.callParent();
    },

    execute: function(params) {
        this.getStore('Rooms').load();
        return this.getList();
    },

    consumeListAddRoomClick: function() {
        var addView = this.getAdd({
            record: this.getModel('Room').create()
        });

        addView.on('saveclick', this.consumeFormSaveClick, this);
    },

    consumeFormSaveClick: function(view) {
        var form = view.form;

        var record = form.getRecord();
        var values = form.getValues();

        record.set(values);
        record.save({
            success: function(record, operation) {
                this.getStore('Rooms').load();
                view.close();
            },
            failure: function(record, operation) {
                Ext.MessageBox.show({
                    title: 'Saving room data',
                    msg: 'There has been an error processing your request!!!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.Msg.ERROR
                });
            },
            scope: this
        });
    }
});