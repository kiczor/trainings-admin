Ext.define('TA.view.room.Add', {
    extend: 'Ext.window.Window',
    alias : 'widget.roomadd',

    title : 'Add room',
    layout: 'fit',

    modal: true,
    resizable: false,
    draggable: false,

    autoShow: true,

    form: null,
    formPanel: null,

    roomFloorsStore: null,

    initComponent: function() {
        this.addEvents('saveclick', 'cancelclick');

        this.buildForm();

        this.form = this.formPanel.getForm();

        this.callParent(arguments);
        this.record.set('space', 10);
        this.record.set('floor', this.roomFloorsStore.getAt(0).get('value'));
        this.form.loadRecord(this.record);
    },

    buildForm: function() {
        var floorsStore = Ext.StoreManager.lookup('RoomFloors');
        this.formPanel = Ext.create('Ext.form.Panel', {
            defaults: { // defaults are applied to items, not the container
                margin: 2,
                width: 235
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name : 'id'
                },{
                    xtype: 'textfield',
                    name : 'name',
                    fieldLabel: 'Name',
                    allowBlank: false
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Space',
                    name : 'space',
                    maxValue: 99,
                    minValue: 1,
                    labelWidth: 180,
                    regex: /^\d{0,2}$/,
                    regexText: "<b>Error</b></br>Invalid space entered.",
                    validator: function(v) {
                        return /^\d{0,2}$/.test(v) ? true : "Invalid Number";
                    },
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Floor',
                    store: this.roomFloorsStore,
                    name: 'floor',
                    labelWidth: 180,
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    allowBlank: false,
                    listConfig: {
                        minWidth: 50
                    }
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