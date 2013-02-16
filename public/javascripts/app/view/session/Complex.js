Ext.define('TA.view.session.Complex', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sessioncomplex',

    requires: ['TA.view.session.Tree', 'TA.view.session.Chart', 'TA.store.SessionsChart'],

    title: 'Sessions',

    sessionsStore: null,
    roomsStore: null,
    sessionsTreeStore: null,

    sessionsChartStore: null,

    sessionsTree: null,
    sessionsList: null,
    sessionsChart: null,

    sessionsListRelayers: null,
    sessionsTreeRelayers: null,

    layout: {
        type: 'hbox'
    },

    initComponent: function() {
        this.sessionsChartStore = Ext.create('TA.store.SessionsChart');
        this.buildItems();
        this.callParent();
    },

    destroy: function() {
        this.sessionsTree.un('coachclick', this.consumeSessionsListCoachClick, this);
        this.sessionsTree.un('coachesclick', this.consumeSessionsListCoachesClick, this);
        this.sessionsTree.un('trainingclick', this.consumeSessionsListTrainingClick, this);
        this.sessionsTree.un('trainingsclick', this.consumeSessionsListTrainingsClick, this);

        this.sessionsStore.un('beforeload', this.consumeSessionsStoreBeforeLoad, this);
        this.sessionsStore.un('load', this.consumeSessionsStoreLoad, this);
        this.sessionsStore.un('filter', this.consumeSessionsStoreDataChanged, this);
        Ext.destroy(this.sessionsListRelayers);
        Ext.destroy(this.sessionsTreeRelayers);
        this.callParent();
    },

    buildItems: function() {
        this.sessionsTree = Ext.create('TA.view.session.Tree', {
            store: this.sessionsTreeStore,
            flex: 1,
            height: '100%'
        });

        this.sessionsTree.on('coachclick', this.consumeSessionsTreeCoachClick, this);
        this.sessionsTree.on('coachesclick', this.consumeSessionsTreeCoachesClick, this);
        this.sessionsTree.on('trainingclick', this.consumeSessionsTreeTrainingClick, this);
        this.sessionsTree.on('trainingsclick', this.consumeSessionsTreeTrainingsClick, this);

        this.sessionsTreeRelayers = this.relayEvents(this.sessionsTree, ['coachclick', 'trainingclick', 'coachesclick', 'trainingsclick']);

        this.sessionsList = Ext.create('TA.view.session.List', {
            roomsStore: this.roomsStore
        });

        this.sessionsListRelayers = this.relayEvents(this.sessionsList, ['addsessionclick', 'editsessionclick', 'deletesessionclick', 'sessionedited']);

        this.sessionsChart = Ext.create('TA.view.session.Chart', {
            store: this.sessionsChartStore,
            flex: 2
        });

        this.items = [
            this.sessionsTree,
            {
                xtype: 'container',
                bodyStyle:'border-top:none;border-bottom:none;border-right:none;',
                flex: 5,
                height: '100%',
                border: false,
                layout: {
                    type: 'vbox'
                },
                defaults: {
                    flex: 1,
                    width: '100%'
                },
                items: [
                    this.sessionsList,
                    this.sessionsChart
                ]
            }
        ]
    },

    reconfigure: function(sessionsStore) {
        if (this.sessionsStore) {
            this.sessionsStore.un('beforeload', this.consumeSessionsStoreBeforeLoad, this);
            this.sessionsStore.un('load', this.consumeSessionsStoreLoad, this);
            this.sessionsStore.un('datachanged', this.consumeSessionsStoreDataChanged, this);
        }
        this.sessionsStore = sessionsStore;
        this.sessionsStore.on('beforeload', this.consumeSessionsStoreBeforeLoad, this);
        this.sessionsStore.on('load', this.consumeSessionsStoreLoad, this);
        this.sessionsStore.on('datachanged', this.consumeSessionsStoreDataChanged, this);
        this.sessionsList.reconfigure(sessionsStore);
    },

    consumeSessionsStoreBeforeLoad: function(store) {
        this.setLoading(true);
    },

    consumeSessionsStoreLoad: function(store, records, eOpts) {
        this.setLoading(false);
    },

    consumeSessionsStoreDataChanged: function(store) {
        var renderMode = this.sessionsChart.getRenderMode();
        if(renderMode === this.sessionsChart.self.TERMS_RENDERMODE) {
            this.sessionsChartStore.loadData(store.getChartDataPerTerm());
        }
        else {
            this.sessionsChartStore.loadData(store.getChartData());
        }
    },

    consumeSessionsTreeCoachClick: function(view, coach) {
        this.sessionsChart.setRenderMode(this.sessionsChart.self.DEFAULT_RENDERMODE);
    },
    consumeSessionsTreeCoachesClick: function(view) {
        this.sessionsChart.setRenderMode(this.sessionsChart.self.DEFAULT_RENDERMODE);
        this.sessionsChartStore.loadData(this.sessionsStore.getChartData());
    },
    consumeSessionsTreeTrainingClick: function(view, training) {
        this.sessionsChart.setRenderMode(this.sessionsChart.self.TERMS_RENDERMODE);
    },
    consumeSessionsTreeTrainingsClick: function(view) {
        this.sessionsChart.setRenderMode(this.sessionsChart.self.TERMS_RENDERMODE);
        this.sessionsChartStore.loadData(this.sessionsStore.getChartDataPerTerm());
    }
});