Ext.define('TA.view.participant.Add', {
    extend: 'Ext.window.Window',
    alias : 'widget.participantadd',

    title : 'Add participant',
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
        this.form.loadRecord(this.record);
    },

    buildForm: function() {
        this.formPanel = Ext.create('Ext.form.Panel', {
            defaults: { // defaults are applied to items, not the container
                margin: 2,
                width: 400
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name : 'id'
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Name',
                    layout: {
                        type: 'hbox'
                    },
                    defaults: {
                        flex: 2
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name : 'name',
                            emptyText: 'name',
                            allowBlank: false,
                            margin: '0 2 0 0'
                        },{
                            xtype: 'textfield',
                            name : 'surname',
                            emptyText: 'surname',
                            allowBlank: false,
                            flex: 3
                        }
                    ]
                },
                ,{
                    xtype: 'textfield',
                    name : 'email',
                    fieldLabel: 'Email',
                    vtype: 'email',
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