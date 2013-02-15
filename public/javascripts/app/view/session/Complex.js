Ext.define('TA.view.session.Complex', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sessioncomplex',

    title: 'Sessions',

    roomsStore: null,

    sessionsList: null,

    sessionsListRelayers: null,

    layout: {
        type: 'hbox'
    },

    initComponent: function() {
        this.buildItems();
        this.callParent();
    },

    destroy: function() {
        Ext.destroy(this.sessionsListRelayers);
        this.callParent();
    },

    buildItems: function() {
        this.sessionsList = Ext.create('TA.view.session.List', {
            flex: 5,
            height: '100%',
            border: false,
            roomsStore: this.roomsStore
        });

        this.sessionsListRelayers = this.relayEvents(this.sessionsList, ['addsessionclick', 'editsessionclick', 'deletesessionclick', 'sessionedited']);

        this.items = [{
            xtype: 'panel',
            html: 'tree here',
            flex: 1,
            height: '100%',
            bodyStyle:'border-top:none;border-bottom:none;border-left:none;'
        },
        this.sessionsList]
    },

    reconfigure: function(sessionsStore) {
        this.sessionsList.reconfigure(sessionsStore);
    }
});