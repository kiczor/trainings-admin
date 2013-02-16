Ext.define('TA.view.session.Complex', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sessioncomplex',

    requires: ['TA.view.session.Tree'],

    title: 'Sessions',

    sessionsStore: null,
    roomsStore: null,
    sessionsTreeStore: null,

    sessionsTree: null,
    sessionsList: null,

    sessionsListRelayers: null,
    sessionsTreeRelayers: null,

    layout: {
        type: 'hbox'
    },

    initComponent: function() {
        this.buildItems();
        this.callParent();
    },

    destroy: function() {
        this.sessionsStore.un('beforeload', this.consumeSessionsStoreBeforeLoad, this);
        this.sessionsStore.un('load', this.consumeSessionsStoreLoad, this);
        Ext.destroy(this.sessionsListRelayers);
        Ext.destroy(this.sessionsTreeRelayers);
        this.callParent();
    },

    buildItems: function() {
        this.sessionsTree = Ext.create('TA.view.session.Tree', {
            store: this.sessionsTreeStore,
            flex: 1,
            height: '100%',
            bodyStyle:'border-top:none;border-bottom:none;border-left:none;'
        });

        this.sessionsTreeRelayers = this.relayEvents(this.sessionsTree, ['coachclick', 'trainingclick', 'coachesclick', 'trainingsclick']);

        this.sessionsList = Ext.create('TA.view.session.List', {
            flex: 5,
            height: '100%',
            border: false,
            roomsStore: this.roomsStore
        });

        this.sessionsListRelayers = this.relayEvents(this.sessionsList, ['addsessionclick', 'editsessionclick', 'deletesessionclick', 'sessionedited']);

        this.items = [
            this.sessionsTree,
            this.sessionsList
        ]
    },

    reconfigure: function(sessionsStore) {
        if (this.sessionsStore) {
            this.sessionsStore.un('beforeload', this.consumeSessionsStoreBeforeLoad, this);
            this.sessionsStore.un('load', this.consumeSessionsStoreLoad, this);
        }
        this.sessionsStore = sessionsStore;
        this.sessionsStore.on('beforeload', this.consumeSessionsStoreBeforeLoad, this);
        this.sessionsStore.on('load', this.consumeSessionsStoreLoad, this);
        this.sessionsList.reconfigure(sessionsStore);
    },

    consumeSessionsStoreBeforeLoad: function(store) {
        this.setLoading(true);
    },

    consumeSessionsStoreLoad: function(store, records, eOpts) {
        this.setLoading(false);
    }
});