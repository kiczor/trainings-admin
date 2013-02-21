Ext.define('TA.controller.Sessions', {
    extend: 'Ext.app.Controller',

    models: [
        'Session'
    ],

    stores: [
        'Sessions'
    ],

    views: [
        'session.List',
        'session.Add',
        'session.Edit'
    ],

    refs: [
        {
            ref: 'list',
            selector: '',
            xtype: 'sessionlist',
            autoCreate: true
        },
        {
            ref: 'add',
            selector: '',
            xtype: 'sessionadd',
            autoCreate: true
        },
        {
            ref: 'edit',
            selector: '',
            xtype: 'sessionedit',
            autoCreate: true
        }
    ],

    init: function() {
        this.callParent();
    },

    onLaunch: function() {
        this.callParent();
        var roomsStore = Ext.create('TA.store.Rooms');
        roomsStore.load();
        this.getList({
            roomsStore: roomsStore
        })
        this.getList().on('addsessionclick', this.consumeListAddSessionClick, this);
        this.getList().on('editsessionclick', this.consumeListEditSessionClick, this);
        this.getList().on('deletesessionclick', this.consumeListDeleteSessionClick, this);
        this.getList().on('sessionedited', this.consumeListSessionEdited, this);
        this.getList().reconfigure(this.getStore('Sessions'));
    },

    destroy: function() {
        this.getList().un('deletesessionclick', this.consumeListDeleteSessionClick, this);
        this.getList().un('editsessionclick', this.consumeListEditSessionClick, this);
        this.getList().un('addsessionclick', this.consumeListAddSessionClick, this);
        this.getList().un('sessionedited', this.consumeListSessionEdited, this);
        this.getList().destroy();
        this.callParent();
    },

    execute: function(params) {
        this.getStore('Sessions').load();
        return this.getList();
    },

    consumeListAddSessionClick: function() {
        var trainingsStore = Ext.create('TA.store.Trainings');
        trainingsStore.load();
        var roomsStore = Ext.create('TA.store.Rooms');
        roomsStore.load();
        var coachesStore = Ext.create('TA.store.Coaches');
        coachesStore.load();
        var participantsStore = Ext.create('TA.store.Participants');
        participantsStore.load();

        var addView = this.getEdit({
            record: this.getModel('Session').create(),
            trainingsStore: trainingsStore,
            roomsStore: roomsStore,
            coachesStore: coachesStore,
            participantsStore: participantsStore
        });

        addView.on('saveclick', this.consumeFormSaveClick, this);
    },

    consumeFormSaveClick: function(view) {
        var form = view.form;

        var record = form.getRecord();
        var values = form.getValues();
        console.log(values);
        Ext.Ajax.request({
            url: record.proxy.url + (record.get('id') ? '/'+record.get('id') : ''),
            method: record.get('id') ? record.proxy.actionMethods['update'] : record.proxy.actionMethods['create'],
            params:values,
            success: function() {
                this.getStore('Sessions').load();
                view.close();
            },
            failure: function(record, operation) {
                Ext.MessageBox.show({
                    title: 'Saving session data',
                    msg: 'There has been an error processing your request!!!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.Msg.ERROR
                });
            },
            scope: this
        });
    },

    consumeListEditSessionClick: function(view, record) {
        var trainingsStore = Ext.create('TA.store.Trainings');
        trainingsStore.load();
        var roomsStore = Ext.create('TA.store.Rooms');
        roomsStore.load();
        var coachesStore = Ext.create('TA.store.Coaches');
        coachesStore.load();
        var participantsStore = Ext.create('TA.store.Participants');
        participantsStore.load();

        var editView = this.getEdit({
            record: record,
            trainingsStore: trainingsStore,
            roomsStore: roomsStore,
            coachesStore: coachesStore,
            participantsStore: participantsStore
        });

        editView.on('saveclick', this.consumeFormSaveClick, this);
    },

    consumeListDeleteSessionClick: function(list, record) {
        record.destroy({
            success: function() {
                this.getStore('Sessions').reload();
            },
            failure: function() {
                Ext.MessageBox.show({
                    title: 'Deleting session',
                    msg: 'There has been an error processing your request!!!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.Msg.ERROR
                });
            },
            scope: this
        });
    },

    consumeListSessionEdited: function(view, record) {
        record.save({
            success: function() {
                this.getStore('Sessions').reload();
            },
            failure: function() {
                Ext.MessageBox.show({
                    title: 'Saving session data',
                    msg: 'There has been an error processing your request!!!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.Msg.ERROR
                });
            },
            scope: this
        });
    }
});