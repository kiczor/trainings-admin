describe('TA.view.Viewport', function() {
    var viewport = null;

    beforeEach(function() {
        viewport = Ext.create('TA.view.Viewport', {
            renderTo: 'tests'
        });
    });

    afterEach(function() {
        viewport.destroy();
    });

    describe('[constructor]', function() {
        it('should have fit layout', function() {
            expect(viewport).toBeDefined();
            expect(viewport.getLayout() instanceof Ext.layout.container.Fit).toBeTruthy();
        });

        it('should contain proper panel', function() {
            expect(viewport).toBeDefined();
            var panel = viewport.items.getAt(0);

            expect(panel).toBeDefined();
            expect(panel.isXType('panel')).toBeTruthy();

            expect(viewport.items.getCount()).toEqual(1);
        });

        describe('inner panel', function() {
            var panel = null;

            beforeEach(function() {
                panel = viewport.items.getAt(0);
            });

            it('should have card layout', function() {
                expect(panel.getLayout() instanceof Ext.layout.container.Card).toBeTruthy();
            });

            it('should have TA.view.toolbar.Navigation docked at top', function() {
                expect(panel.getDockedItems()[1]).toBeDefined();
                expect(panel.getDockedItems()[1].isXType('ta.navigation-toolbar')).toBeDefined();
                expect(panel.getDockedItems()[1].dock).toEqual('top');
            });
        });
    });
});