describe('TA.view.toolbar.Navigation', function() {
    var toolBar = null;


    beforeEach(function() {
        toolBar = Ext.create('TA.view.toolbar.Navigation', {
            renderTo: 'tests'
        });
    });

    afterEach(function() {
        toolBar.destroy();
    });

    it('should inherit from Ext.toolbar.Toolbar', function() {
        expect(toolBar.isXType('toolbar')).toBeTruthy();
    });

    it('should have proper defaults', function() {
        expect(toolBar.defaults).toEqual({
            enableToggle: true,
            toggleGroup: 'navigation',
            allowDepress: false
        });
    });

    it('should have proper margins', function() {
        expect(toolBar.getEl().getMargin('t')).toEqual(4);
        expect(toolBar.getEl().getMargin('l')).toEqual(0);
        expect(toolBar.getEl().getMargin('b')).toEqual(0);
        expect(toolBar.getEl().getMargin('r')).toEqual(0);
    });

    it('should have coaches button', function() {
        expect(toolBar.items.getAt(0).isXType('button')).toBeTruthy();
        expect(toolBar.items.getAt(0).getText()).toEqual('Coaches');
    });

    it('should have trainings button', function() {
        expect(toolBar.items.getAt(1).isXType('button')).toBeTruthy();
        expect(toolBar.items.getAt(1).getText()).toEqual('Trainings');
    });

    it('should have participants button', function() {
        expect(toolBar.items.getAt(2).isXType('button')).toBeTruthy();
        expect(toolBar.items.getAt(2).getText()).toEqual('Participants');
    });

    it('should have rooms button', function() {
        expect(toolBar.items.getAt(3).isXType('button')).toBeTruthy();
        expect(toolBar.items.getAt(3).getText()).toEqual('Rooms');
    });

    it('should have sessions button', function() {
        expect(toolBar.items.getAt(4).isXType('button')).toBeTruthy();
        expect(toolBar.items.getAt(4).getText()).toEqual('Sessions');
    });
});