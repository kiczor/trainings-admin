Ext.define('TA.controller.Participants', {
    extend: 'Ext.app.Controller',

    models: [
        'Participant'
    ],

    stores: [
        'Participants'
    ],

    views: [
        'participant.List',
        'participant.Add',
        'participant.Edit'
    ],

    refs: [
        {
            ref: 'mainView',
            selector: '',
            xtype: 'participantlist',
            autoCreate: true
        },
        {
            ref: 'add',
            selector: '',
            xtype: 'participantadd',
            autoCreate: true
        },
        {
            ref: 'edit',
            selector: '',
            xtype: 'participantedit',
            autoCreate: true
        }
    ],

    init: function() {
        this.callParent();
    },

    onLaunch: function() {
        this.callParent();
        this.getMainView().on('addparticipantclick', this.consumeListAddParticipantClick, this);
        this.getMainView().on('editparticipantclick', this.consumeListEditParticipantClick, this);
        this.getMainView().on('deleteparticipantclick', this.consumeListDeleteParticipantClick, this);
        this.getMainView().reconfigure(this.getStore('Participants'));
    },

    destroy: function() {
        this.getMainView().on('deleteparticipantclick', this.consumeListDeleteParticipantClick, this);
        this.getMainView().on('editparticipantclick', this.consumeListEditParticipantClick, this);
        this.getMainView().on('addparticipantclick', this.consumeListAddParticipantClick, this);
        this.callParent();
    },

    execute: function(params) {
        this.getStore('Participants').load();
        return this.getMainView();
    },

    consumeListAddParticipantClick: function(list) {
        var addView = this.getAdd({
            record: this.getModel('Participant').create()
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
                this.getStore('Participants').load();
                view.close();
            },
            failure: function(record, operation) {
                Ext.MessageBox.show({
                    title: 'Saving participant data',
                    msg: 'There has been an error processing your request!!!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.Msg.ERROR
                });
            },
            scope: this
        });
    },

    consumeListEditParticipantClick: function(list, record) {
        var editView = this.getEdit({
            record: record
        });
        editView.on('saveclick', this.consumeFormSaveClick, this);
    },

    consumeListDeleteParticipantClick: function(list, record) {
        record.destroy({
            success: function() {
                this.getStore('Participants').reload();
            },
            failure: function() {
                Ext.MessageBox.show({
                    title: 'Deleting participant',
                    msg: 'There has been an error processing your request!!!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.Msg.ERROR
                });
            },
            scope: this
        });
    }
});