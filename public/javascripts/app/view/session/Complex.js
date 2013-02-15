Ext.define('TA.view.session.Complex', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sessioncomplex',

    title: 'Sessions',

    layout: {
        type: 'hbox'
    },

    initComponent: function() {
        this.buildItems();
        this.callParent();
    },

    buildItems: function() {
        this.items = [{
            xtype: 'panel',
            html: 'tree here',
            flex: 1,
            height: '100%',
            bodyStyle:'border-top:none;border-bottom:none;border-left:none;'
        },{
            xtype: 'component',
            html: 'list here',
            flex: 5
        }]
    },

    reconfigure: function(sessionsStore) {
    }
});