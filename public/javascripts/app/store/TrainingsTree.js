Ext.define('TA.store.TrainingsTree', {
    extend: 'Ext.data.TreeStore',
    model: 'TA.model.TrainingNode',

    clearOnLoad: true,

    root: {
        name: 'Trainings',
        id: 0
    },

    listeners: {
        append: function(node, child, index, eOpts) {
            if(!child.isRoot()) {
                child.set('leaf', true);
                child.set('text', child.get('name'));
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
        url: 'trainings'
    }
});