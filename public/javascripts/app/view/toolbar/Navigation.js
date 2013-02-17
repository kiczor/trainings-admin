Ext.define('TA.view.toolbar.Navigation', {
    extend: 'Ext.toolbar.Toolbar',
    alias : 'widget.ta.navigation-toolbar',

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
        }
    ]
});