Ext.define('TA.view.session.Tree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.sessiontree',

    rootVisible: false,

    currentPath: '/root',

    initComponent: function() {
        this.addEvents('coachclick', 'trainingclick', 'coachesclick', 'trainingsclick');
        this.callParent();
        this.on('itemclick', this.consumeItemClick, this);
    },

    destroy: function() {
        this.un('itemclick', this.consumeItemClick, this);
        this.callParent();
    },

    consumeItemClick: function(view, record, item, index, e, eOpts) {
        if(record instanceof TA.model.Coach) {
            if(record.get('id')) {
                this.fireEvent('coachclick', this, record);
            }
            else {
                this.fireEvent('coachesclick', this);
            }
        }
        else if(record instanceof TA.model.Training) {
            if(record.get('id')) {
                this.fireEvent('trainingclick', this, record);
            }
            else {
                this.fireEvent('trainingsclick', this);
            }
        }
    }
});