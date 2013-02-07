Ext.define('TA.view.Viewport', {
    extend: 'Ext.Viewport',

    requires: ['TA.view.toolbar.Navigation'],

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
            xtype: 'ta.navigation-toolbar'
        },{
            dock: 'bottom',
            style: 'text-align: center;',
            margin: 5,
            xtype: 'component',
            html: 'Trainings admin v 0.1 by Training Hammer Ltd © 2012 Training Hammer ALL RIGHTS RESERVED'
        }]
    }]
});