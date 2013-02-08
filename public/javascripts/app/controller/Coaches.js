Ext.define('TA.controller.Coaches', {
    extend: 'Ext.app.Controller',

    models: [
        'Coach'
    ],

    stores: [
        'Coaches'
    ],

    views: [
        'coach.List'
    ],

    refs: [
        {
            ref: 'list',
            selector: '',
            xtype: 'coachlist',
            autoCreate: true
        }
    ],

    init: function() {
        this.callParent();
        this.getStore('Coaches').load();
    },

    onLaunch: function() {
        this.callParent();
        this.application.getViewport().add(this.getList());
        this.getList().reconfigure(this.getStore('Coaches'));
    }
});