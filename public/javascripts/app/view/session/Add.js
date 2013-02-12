Ext.define('TA.view.session.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.sessionadd',

    title: 'Add session',
    layout: 'fit',

    modal: true,
    rezisable: false,
    draggable: false,

    autoShow: true,

    form: null,
    formPanel: null,

    trainingsStore: null,

    trainingsCombobox: null,

    initComponent: function() {
        this.addEvents('saveclick', 'cancelclick');

        this.buildForm();

        this.form = this.formPanel.getForm();

        this.callParent(arguments);

        this.form.loadRecord(this.record);

        if(this.record.get('trainingId') === 0) {
            this.trainingsCombobox.setValue('');
        }
    },

    buildForm: function() {
        this.trainingsCombobox = Ext.create('Ext.form.ComboBox', {
            store: this.trainingsStore,
            fieldLabel: 'Training',
            name: 'trainingId',

            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',

            allowBlank: false
        });

        this.formPanel = Ext.create('Ext.form.Panel', {
            defaults: { // defaults are applied to items, not the container
                margin: 2,
                width: 300
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name : 'id'
                },
                this.trainingsCombobox,
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
                {
                    xtype: 'textfield',
                    name: 'trainingRoomId',
                    fieldLabel: 'Room',
                    labelWidth: 250,
                    allowBlank: false
                }
            ],
            buttons: [{
                text: 'Save',
                formBind: true, //only enabled once the form is valid
                disabled: true,
                scope: this,
                handler: this.onSaveHandler
            }, {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }]
        });

        this.items = [this.formPanel];
    },

    onSaveHandler: function() {
        var form = this.down('form').getForm();
        if (form.isValid()) {
            this.fireEvent('saveclick', this);
        }
    }
});