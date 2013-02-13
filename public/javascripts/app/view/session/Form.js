Ext.define('TA.view.session.Form', {
    extend: 'Ext.form.Panel',

    requires: ['TA.form.field.RadioGroup'],

    trainingsStore: null,
    roomsStore: null,

    trainingsComboBox: null,
    roomsRadioGroup: null,

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
            this.roomsRadioGroup
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