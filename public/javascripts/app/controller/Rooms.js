Ext.define('TA.controller.Rooms', {
    extend: 'Ext.app.Controller',

    models: [
        'Room'
    ],

    stores: [
        'Rooms',
        'RoomFloors'
    ],

    views: [
        'room.List',
        'room.Add',
        'room.Edit'
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
        },
        {
            ref: 'edit',
            selector: '',
            xtype: 'roomedit',
            autoCreate: true
        }
    ],

    init: function() {
        this.callParent();
    },

    onLaunch: function() {
        this.callParent();
        this.initList();
        this.getList().reconfigure(this.getStore('Rooms'));
    },

    destroy: function() {
        this.getList().un('deleteroomclick', this.consumeListDeleteRoomClick, this);
        this.getList().un('editroomclick', this.consumeListEditRoomClick, this);
        this.getList().un('addroomclick', this.consumeListAddRoomClick, this);
        this.callParent();
    },

    initList: function() {
        this.getList({
            roomFloorsStore: this.getStore('RoomFloors')
        });
        this.getList().on('addroomclick', this.consumeListAddRoomClick, this);
        this.getList().on('editroomclick', this.consumeListEditRoomClick, this);
        this.getList().on('deleteroomclick', this.consumeListDeleteRoomClick, this);
    },

    execute: function(params) {
        this.getStore('Rooms').load();
        return this.getList();
    },

    consumeListAddRoomClick: function() {
        var addView = this.getAdd({
            record: this.getModel('Room').create(),
            roomFloorsStore: this.getStore('RoomFloors')
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
    },

    consumeListEditRoomClick: function(view, record) {
        var editView = this.getEdit({
            record: record,
            roomFloorsStore: this.getStore('RoomFloors')
        });

        editView.on('saveclick', this.consumeFormSaveClick, this);
    },

    consumeListDeleteRoomClick: function(list, record) {
        record.destroy({
            success: function() {
                this.getStore('Rooms').reload();
            },
            failure: function() {
                Ext.MessageBox.show({
                    title: 'Deleting room',
                    msg: 'There has been an error processing your request!!!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.Msg.ERROR
                });
            },
            scope: this
        });
    }
});