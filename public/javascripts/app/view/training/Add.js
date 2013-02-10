Ext.define('TA.view.training.Add', {
    extend: 'Ext.window.Window',
    alias : 'widget.trainingadd',

    title : 'Add training',
    layout: 'fit',

    modal: true,
    resizable: false,
    draggable: false,

    autoShow: true,

    form: null,
    formPanel: null,

    initComponent: function() {
        this.addEvents('saveclick', 'cancelclick');

        this.buildForm();

        this.form = this.formPanel.getForm();

        this.callParent(arguments);

        this.record.set('days', this.record.get('days') || 1);
        this.record.set('cost', this.record.get('cost') || 1000);

        this.form.loadRecord(this.record);
    },

    buildForm: function() {
        this.formPanel = Ext.create('Ext.form.Panel', {
            defaults: { // defaults are applied to items, not the container
                margin: 2,
                width: 300
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
                },{
                    xtype: 'numberfield',
                    name : 'cost',
                    fieldLabel: 'Cost',
                    labelWidth: 200,
                    regex: /^\d{0,}$/,
                    minValue: 0,
                    step: 100,
                    regexText: "<b>Error</b></br>Invalid cost entered.",
                    validator: function(v) {
                        return /^\d{0,}$/.test(v) ? true : "Invalid Number";
                    },
                    allowBlank: false
                },{
                    xtype: 'numberfield',
                    name : 'days',
                    fieldLabel: 'Days',
                    labelWidth: 250,
                    minValue: 1,
                    regex: /^\d{0,2}$/,
                    regexText: "<b>Error</b></br>Invalid days count entered.",
                    validator: function(v) {
                        return /^\d{0,2}$/.test(v) ? true : "Invalid Number";
                    },
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