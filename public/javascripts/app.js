Ext.define('TA.app.Application', {
    extend: 'Ext.app.Application',
    name: 'TA',

    appFolder: 'javascripts/app',


    launch: function() {
        Ext.create('Ext.Viewport', {
            layout : 'fit',
            items: [{
                xtype: 'panel',
                layout:'auto',
                itemId: 'mainview',
                padding: 10,
                minHeight: 300,
                minWidth: 600,

                dockedItems: [{
                    dock: 'top',
                    xtype: 'label',
                    style: 'font-size:20px;',
                    text: 'Trainings admin application'
                },{
                    dock: 'top',
                    xtype: 'toolbar',
                    margin: '4px 0 0 0',
                    itemId: 'navigation',
                    defaults: {
                        enableToggle: true,
                        toggleGroup: 'navigation',
                        allowDepress: false
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'coaches',
                            text: 'Coaches'
                        },
                        {
                            xtype: 'button',
                            itemId: 'trainings',
                            text: 'Trainings'
                        },
                        {
                            xtype: 'button',
                            itemId: 'participants',
                            text: 'Participants'
                        },
                        {
                            xtype: 'button',
                            itemId: 'rooms',
                            text: 'Rooms'
                        },
                        {
                            xtype: 'button',
                            itemId: 'sessions',
                            text: 'Sessions'
                        },'->',
                        {
                            xtype: 'button',
                            itemId: 'callendar',
                            text: 'Callendar'
                        }
                    ]
                },{
                    dock: 'bottom',
                    style: 'text-align: center;',
                    margin: 5,
                    xtype: 'component',
                    html: 'Trainings admin v 0.1 by Training Hammer Ltd © 2012 Training Hammer ALL RIGHTS RESERVED'
                }]
            }]
        });
    }
});