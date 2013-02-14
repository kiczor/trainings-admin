Ext.define('TA.view.session.Form', {
    extend: 'Ext.form.Panel',

    requires: ['TA.form.field.RadioGroup', 'TA.form.field.CheckboxGroup'],

    trainingsStore: null,
    roomsStore: null,
    coachesStore: null,
    participantsStore: null,

    trainingsComboBox: null,
    roomsRadioGroup: null,
    coachesCheckboxGroup: null,
    participantsCheckboxGroup: null,

    record: null,

    defaults: { // defaults are applied to items, not the container
        margin: 2,
        width: 300
    },

    initComponent: function() {
        this.addEvents('saveclick', 'cancelclick');
        this.buildItems();
        this.buildButtons();

        this.callParent();

        this.form.loadRecord(this.record);

        if(this.record.get('trainingId') === 0) {
            var defaultTrainingId = this.trainingsStore.first() ? this.trainingsStore.first().get('id') : '';
            this.trainingsComboBox.setValue(defaultTrainingId);
            this.trainingsComboBox.clearInvalid();
        }

        if(this.record.getCoaches().count() !== 0) {
            this.coachesCheckboxGroup.setValue(this.record.getCoaches().collect('id'));
            this.coachesCheckboxGroup.clearInvalid();
        }
    },

    buildFields: function() {
        this.trainingsComboBox = Ext.create('Ext.form.ComboBox', {
            store: this.trainingsStore,
            fieldLabel: 'Training',
            name: 'trainingId',

            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',

            allowBlank: false
        });

        this.roomsRadioGroup = Ext.create('TA.form.field.RadioGroup', {
            store: this.roomsStore,
            fieldLabel: 'Room',
            name: 'trainingRoomId',

            displayField: 'name',
            valueField: 'id',

            columns: 3,

            allowBlank: false
        });

        this.coachesCheckboxGroup = Ext.create('TA.form.field.CheckboxGroup', {
            store: this.coachesStore,
            fieldLabel: 'Coaches',
            name: 'coaches',

            displayField: 'name',
            valueField: 'id',

            columns: 3,

            allowBlank: false
        });

        this.participantsCheckboxGroup = Ext.create('Ext.form.CheckboxGroup', {
            fieldLabel: 'Participants',

            columns: 3,

            allowBlank: false,

            items: (function(store, sessionRecord) {
                var items = [];

                var sessionParticipantsIds = sessionRecord.getParticipants().collect('id');

                store.each(function(record) {
                    items.push({
                        boxLabel: record.get('name'),
                        name: 'participants',
                        inputValue: record.get('id'),
                        checked: Ext.Array.indexOf(sessionParticipantsIds, record.get('id')) === -1 ? false : true
                    });
                });

                return items;
            })(this.participantsStore, this.record)
        });
    },

    buildItems: function() {
        this.buildFields();

        this.items = [
            {
                xtype: 'hiddenfield',
                name : 'id'
            },
            this.trainingsComboBox,
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Date',
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        xtype: 'datefield',
                        anchor: '100%',
                        name: 'startDate',
                        format: 'Y-m-d',
                        emptyText: 'since date',
                        allowBlank: false
                    },{
                        xtype: 'datefield',
                        anchor: '100%',
                        name: 'stopDate',
                        format: 'Y-m-d',
                        emptyText: 'due date',
                        allowBlank: false
                    }
                ]
            },
            this.roomsRadioGroup,
            this.coachesCheckboxGroup,
            this.participantsCheckboxGroup
        ];
    },

    buildButtons: function() {
        this.buttons = [{
            text: 'Save',
            scope: this,
            handler: this.onSaveHandler
        }, {
            text: 'Cancel',
            scope: this,
            handler: this.onCancelHandler
        }];
    },

    onSaveHandler: function() {
        var form = this.getForm();
        if (form.isValid()) {
            this.fireEvent('saveclick', this);
        }
    },

    onCancelHandler: function() {
        this.fireEvent('cancelclick', this);
    }
});