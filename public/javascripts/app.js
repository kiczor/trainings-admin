Ext.define('TA.app.Application', {
    extend: 'Ext.app.Application',
    name: 'TA',

    appFolder: 'javascripts/app',

    viewport: null,

    controllers: ['Navigation', 'Coaches', 'Rooms', 'Participants', 'Trainings', 'Sessions'],

    autoCreateViewport: true,

    getViewport: function() {
        this.viewport= this.viewport || Ext.ComponentQuery.query('viewport panel')[0];
        return this.viewport;
    },

    launch: function() {
        this.getController('Navigation').on('navigate', this.consumeNavigate, this);
    },

    consumeNavigate: function(controller, controllerName, params) {
        try {
            var targetController = this.getController(controllerName);
            if(targetController) {
                var actionView = targetController.execute(params);
                if(actionView) {
                    this.getViewport().getLayout().setActiveItem(actionView);
                }
            }
            else {
                Ext.Error.rise('No controller found');
            }
        } catch(e) {
            Ext.MessageBox.show({
                msg: 'Some error occurred....',
                buttons: Ext.MessageBox.OK,
                icon: Ext.Msg.ERROR
            });
        }
    }
});