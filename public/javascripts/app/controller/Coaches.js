Ext.define('TA.controller.Coaches', {
    extend: 'Ext.app.Controller',

    models: [
        'Coach'
    ],

    stores: [
        'Coaches'
    ],

    views: [
        'coach.List',
        'coach.Add'
    ],

    refs: [
        {
            ref: 'list',
            selector: '',
            xtype: 'coachlist',
            autoCreate: true
        },
        {
            ref: 'add',
            selector: '',
            xtype: 'coachadd',
            autoCreate: true
        }
    ],

    init: function() {
        this.callParent();
        this.getStore('Coaches').load();
    },

    onLaunch: function() {
        this.callParent();
        this.getList().on('addcoachclick', this.consumeListAddCoachClick, this);
        this.application.getViewport().add(this.getList());
        this.getList().reconfigure(this.getStore('Coaches'));
    },

    destroy: function() {
        this.getList().un('addcoachclick', this.consumeListAddCoachClick, this);
        this.callParent();
    },

    consumeListAddCoachClick: function(list) {
        var addView = this.getAdd({
            record: this.getModel('Coach').create()
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
                this.getStore('Coaches').load();
                view.close();
            },
            failure: function(record, operation) {
                Ext.MessageBox.show({
                    title: 'Saving coach data',
                    msg: 'There has been an error processing your request!!!',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.Msg.ERROR
                });
            },
            scope: this
        });
    }
});