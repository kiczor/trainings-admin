Ext.define('TA.controller.Navigation', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'navigation',
        selector: '#navigation'
    }],

    init: function() {
        this.addEvents('navigate');

        this.control({
            '#coaches':{
                click: function(target, event, eOpts){
                    this.navigateTo('Coaches');

                }
            },
            '#rooms':{
                click: function(target, event, eOpts){
                    this.navigateTo('Rooms');
                }
            }
        });
    },

    navigateTo: function(controllerName, params) {
        this.fireEvent('navigate', this, controllerName, params);
    }

});