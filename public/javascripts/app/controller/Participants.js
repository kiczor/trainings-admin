Ext.define('TA.controller.Participants', {
    extend: 'Ext.app.Controller',

    models: [
        'Participant'
    ],

    stores: [
        'Participants'
    ],

    init: function() {
        this.callParent();
    },

    destroy: function() {
        this.callParent();
    },

    execute: function(params) {
        return null;
    }
});