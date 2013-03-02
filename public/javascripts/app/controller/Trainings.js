Ext.define('TA.controller.Trainings', {
    extend: 'Ext.app.Controller',

    models: [
        'Training'
    ],

    stores: [
        'Trainings'
    ],

    views: [
        'training.List',
        'training.Add',
        'training.Edit'
    ],

    refs: [
        {
            ref: 'mainView',
            selector: '',
            xtype: 'traininglist',
            autoCreate: true
        },
        {
            ref: 'add',
            selector: '',
            xtype: 'trainingadd',
            autoCreate: true
        },
        {
            ref: 'edit',
            selector: '',
            xtype: 'trainingedit',
            autoCreate: true
        }
    ],

    init: function() {
        this.callParent();
    },

    onLaunch: function() {
        this.callParent();
        this.getMainView().on('addtrainingclick', this.consumeListAddTrainingClick, this);
        this.getMainView().on('edittrainingclick', this.consumeListEditTrainingClick, this);
        this.getMainView().on('deletetrainingclick', this.consumeListDeleteTrainingClick, this);
        this.getMainView().reconfigure(this.getStore('Trainings'));
    },

    destroy: function() {
        this.getMainView().un('deletetrainingclick', this.consumeListDeleteTrainingClick, this);
        this.getMainView().un('edittrainingclick', this.consumeListEditTrainingClick, this);
        this.getMainView().un('addtrainingclick', this.consumeListAddTrainingClick, this);
        this.callParent();
    },

    execute: function(params) {
        this.getStore('Trainings').load();
        return this.getMainView();
    },

    consumeListAddTrainingClick: function() {
        var addView = this.getAdd({
            record: this.getModel('Training').create()
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
                this.getStore('Trainings').load();
                view.close();
            },
            failure: function(record, operation) {
                Ext.MessageBox.show({
                    title: 'Saving training data',
                    msg: 'There has been an error processing your request!!!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.Msg.ERROR
                });
            },
            scope: this
        });
    },

    consumeListEditTrainingClick: function(view, record) {
        var editView = this.getEdit({
            record: record
        });

        editView.on('saveclick', this.consumeFormSaveClick, this);
    },

    consumeListDeleteTrainingClick: function(list, record) {
        record.destroy({
            success: function() {
                this.getStore('Trainings').reload();
            },
            failure: function() {
                Ext.MessageBox.show({
                    title: 'Deleting training',
                    msg: 'There has been an error processing your request!!!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.Msg.ERROR
                });
            },
            scope: this
        });
    }
});