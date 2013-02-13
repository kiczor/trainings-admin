Ext.define('TA.view.session.Form', {
    extend: 'Ext.form.Panel',

    trainingsStore: null,
    roomsStore: null,

    trainingsComboBox: null,
    roomsComboBox: null,

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
        if(this.record.get('trainingRoomId') === 0) {
            var defaultRoomId = this.roomsStore.first() ? this.roomsStore.first().get('id') : '';
            this.roomsComboBox.setValue(defaultRoomId);
            this.roomsComboBox.clearInvalid();
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

        this.roomsComboBox = Ext.create('Ext.form.ComboBox', {
            store: this.roomsStore,
            fieldLabel: 'Room',
            labelWidth: 210,
            name: 'trainingRoomId',

            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',

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
            this.roomsComboBox
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