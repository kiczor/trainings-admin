Ext.define('TA.store.SessionsTree', {
    extend: 'Ext.data.TreeStore',

    root: {
        text: 'All',
        id: 'root',
        expanded: true
    },

    proxy: {
        type: 'memory'
    }
});