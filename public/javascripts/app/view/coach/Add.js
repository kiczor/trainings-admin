Ext.define('TA.view.coach.Add', {
    extend: 'Ext.window.Window',
    alias : 'widget.coachadd',

    title : 'Add coach',
    layout: 'fit',

    modal: true,
    resizable: false,
    draggable: false,

    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
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
            }
        ];

        this.callParent(arguments);
        this.down('form').loadRecord(this.record);
    },

    onSaveHandler: function() {
        var form = this.down('form').getForm();
        if (form.isValid()) {
            form.updateRecord();
            form.getRecord().save({
                success: function(record, operation) {
                    this.close();
                },
                failure: function(record, operation) {
                    Ext.MessageBox.show({
                        title: 'Saving coach data',
                        msg: 'There has been an error processing your request!!!',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
                ,scope: this
            });
        }
    }
});