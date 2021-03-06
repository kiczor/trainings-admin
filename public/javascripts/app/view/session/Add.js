Ext.define('TA.view.session.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.sessionadd',

    requires: ['TA.view.session.Form'],

    title: 'Add session',
    layout: 'fit',

    modal: true,
    resizable: false,
    draggable: false,

    autoShow: true,

    form: null,
    formPanel: null,

    trainingsStore: null,
    roomsStore: null,
    coachesStore: null,
    participantsStore: null,

    isTrainingsStoreLoaded: true,
    isRoomsStoreLoaded: true,
    isCoachesStoreLoaded: true,
    isParticipantsStoreLoaded: true,

    initComponent: function() {
        this.addEvents('saveclick', 'cancelclick');
        this.buildForm();
        this.callParent();
        this.on('afterrender', this.consumeAfterRender, this);
    },

    destroy: function() {
        this.cleanupStores();
        this.un('afterrender', this.consumeAfterRender, this);
        if(this.formPanel) {
            this.formPanel.un('saveclick', this.consumeFormPanelSaveClick, this);
            this.formPanel.un('cancelclick', this.consumeFormPanelCancelClick, this);
        }
        this.callParent();
    },

    consumeAfterRender: function(panel) {
        this.initStores();
    },

    initStores: function() {
        if(this.trainingsStore.isLoading()) {
            this.isTrainingsStoreLoaded = false;
        }
        this.trainingsStore.on('beforeload', this.onTrainigsStoreBeforeLoad, this);
        this.trainingsStore.on('load', this.onTrainingsStoreLoad, this);

        if(this.roomsStore.isLoading()) {
            this.isRoomsStoreLoaded = false;
        }
        this.roomsStore.on('beforeload', this.onRoomsStoreBeforeLoad, this);
        this.roomsStore.on('load', this.onRoomsStoreLoad, this);

        if(this.coachesStore.isLoading()) {
            this.isCoachesStoreLoaded = false;
        }
        this.coachesStore.on('beforeload', this.onCoachesStoreBeforeLoad, this);
        this.coachesStore.on('load', this.onCoachesStoreLoad, this);

        if(this.participantsStore.isLoading()) {
            this.isParticipantsStoreLoaded = false;
        }
        this.participantsStore.on('beforeload', this.onParticipantsStoreBeforeLoad, this);
        this.participantsStore.on('load', this.onParticipantsStoreLoad, this);
    },

    cleanupStores: function() {
        this.trainingsStore.un('beforeload', this.onTrainigsStoreBeforeLoad, this);
        this.trainingsStore.un('load', this.onTrainingsStoreLoad, this);
        this.roomsStore.un('beforeload', this.onRoomsStoreBeforeLoad, this);
        this.roomsStore.un('load', this.onRoomsStoreLoad, this);
        this.coachesStore.un('beforeload', this.onCoachesStoreBeforeLoad, this);
        this.coachesStore.un('load', this.onCoachesStoreLoad, this);
        this.participantsStore.un('beforeload', this.onParticipantsStoreBeforeLoad, this);
        this.participantsStore.un('load', this.onParticipantsStoreLoad, this);
    },

    buildForm: function() {
        this.formPanel = Ext.create('TA.view.session.Form', {
            trainingsStore: this.trainingsStore,
            roomsStore: this.roomsStore,
            coachesStore: this.coachesStore,
            participantsStore: this.participantsStore,
            record: this.record
        });

        this.form = this.formPanel.getForm();

        this.formPanel.on('saveclick', this.consumeFormPanelSaveClick, this);
        this.formPanel.on('cancelclick', this.consumeFormPanelCancelClick, this);

        if(this.rendered) {
            this.items.add(this.formPanel);
            this.doLayout();
            this.center();
        }
        else {
            this.items = [this.formPanel];
        }
    },

    onTrainigsStoreBeforeLoad: function() {
        this.isTrainingsStoreLoaded = false;
    },

    onRoomsStoreBeforeLoad: function() {
        this.isRoomsStoreLoaded = false;
    },

    onCoachesStoreBeforeLoad: function() {
        this.isCoachesStoreLoaded = false;
    },

    onParticipantsStoreBeforeLoad: function() {
        this.isParticipantsStoreLoaded = false;
    },

    onTrainingsStoreLoad: function() {
        this.isTrainingsStoreLoaded = true;
        if(this.isRoomsStoreLoaded && this.isCoachesStoreLoaded && this.isParticipantsStoreLoaded) {
            if(this.formPanel) {
                this.remove(this.formPanel, true);
                this.form = null;
                delete this.formPanel;
            }
            this.buildForm();
        }
    },

    onRoomsStoreLoad: function() {
        this.isRoomsStoreLoaded = true;
        if(this.isTrainingsStoreLoaded && this.isCoachesStoreLoaded && this.isParticipantsStoreLoaded) {
            if(this.formPanel) {
                this.remove(this.formPanel, true);
                this.form = null;
                delete this.formPanel;
            }
            this.buildForm();
        }
    },

    onCoachesStoreLoad: function() {
        this.isCoachesStoreLoaded = true;
        if(this.isTrainingsStoreLoaded && this.isRoomsStoreLoaded && this.isParticipantsStoreLoaded) {
            if(this.formPanel) {
                this.remove(this.formPanel, true);
                this.form = null;
                delete this.formPanel;
            }
            this.buildForm();
        }
    },

    onParticipantsStoreLoad: function() {
        this.isParticipantsStoreLoaded = true;
        if(this.isTrainingsStoreLoaded && this.isRoomsStoreLoaded && this.isCoachesStoreLoaded) {
            if(this.formPanel) {
                this.remove(this.formPanel, true);
                this.form = null;
                delete this.formPanel;
            }
            this.buildForm();
        }
    },

    consumeFormPanelSaveClick: function() {
        this.fireEvent('saveclick', this);
    },

    consumeFormPanelCancelClick: function() {
        this.close();
    }
});