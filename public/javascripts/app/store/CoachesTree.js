Ext.define('TA.store.CoachesTree', {
    extend: 'Ext.data.TreeStore',
    model: 'TA.model.CoachNode',

    clearOnLoad: true,

    root: {
        name: 'Coaches',
        surname: '',
        id: 0
    },

    listeners: {
        append: function(node, child, index, eOpts) {
            if(!child.isRoot()) {
                child.set('leaf', true);
                child.set('text', Ext.String.format('{0} {1}', child.get('name'), child.get('surname'))),
                child.set('cls', 'file');
            }
            else {
                child.set('leaf', false);
                child.set('text', child.get('name'));
                child.set('cls', 'folder');
            }
        },
        beforeexpand: function(node, eOpts) {
            this.reload();
        }
    },

    proxy: {
        type: 'ajax',
        url: 'coaches'
    }
});