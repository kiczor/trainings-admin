describe('TA.controller.Navigation', function() {
    var controller = null;
    var app = null;

    beforeEach(function() {
        app = new TA.app.Application({
            autoCreateViewport: false
        });

        controller = app.getController('Navigation');
        controller.init();
        controller.onLaunch();
    });

    afterEach(function() {
        controller.destroy();
        app.destroy();
    });

    describe('[constructor]', function() {
        it('should have ref for navigation toolbar', function() {
            var toolBar = Ext.create('TA.view.toolbar.Navigation', {
                renderTo: 'tests'
            });
            expect(toolBar).toBeDefined();
            expect(controller).toBeDefined();
            expect(controller.hasRef('navigation')).toBeTruthy();
            expect(controller.getNavigation()).toBeDefined();
            toolBar.destroy();
        });

        it('should have "navigate" event', function() {
            expect(controller).toBeDefined();
            expect(controller.events['navigate']).toBeDefined();
        });
    });

    describe('[navigateTo]', function() {
        it('it should be function', function() {
            expect(controller).toBeDefined();
            expect(Ext.isFunction(controller.navigateTo)).toBeTruthy();
        });

        it('should emit event "navigate"', function() {
            expect(controller).toBeDefined();

            var eventListener = {
                consumeNavigate: function() {}
            };
            var spy = spyOn(eventListener, 'consumeNavigate');
            controller.on('navigate', eventListener.consumeNavigate, eventListener);

            controller.navigateTo();

            expect(spy).toHaveBeenCalledWith(controller, undefined, undefined, {});
            controller.un('navigate', eventListener.consumeNavigate, eventListener);
        });

        it('should pass to event controllerName and params', function() {
            expect(controller).toBeDefined();

            var eventListener = {
                consumeNavigate: function() {}
            };
            var spy = spyOn(eventListener, 'consumeNavigate');
            controller.on('navigate', eventListener.consumeNavigate, eventListener);

            controller.navigateTo("someController", {param1: true});

            expect(spy).toHaveBeenCalledWith(controller, "someController", {param1: true}, {});
            controller.un('navigate', eventListener.consumeNavigate, eventListener);
        });
    });

    describe('functional', function() {
        var toolBar = null;

        beforeEach(function() {
            toolBar = Ext.create('TA.view.toolbar.Navigation', {
                renderTo: 'tests'
            });
        });

        afterEach(function() {
            toolBar.destroy();
        });

        it('should navigate to Coaches when coaches button clicked', function() {
            expect(controller).toBeDefined();
            expect(toolBar).toBeDefined();

            var coachesBtn = toolBar.items.getAt(0);


            var spy = spyOn(controller, 'navigateTo');

            coachesBtn.fireEvent('click');

            expect(spy).toHaveBeenCalledWith('Coaches');
        });

        it('should navigate to Trainings controller when trainings button clicked', function() {
            expect(controller).toBeDefined();
            expect(toolBar).toBeDefined();

            var coachesBtn = toolBar.items.getAt(1);


            var spy = spyOn(controller, 'navigateTo');

            coachesBtn.fireEvent('click');

            expect(spy).toHaveBeenCalledWith('Trainings');
        });

        it('should navigate to Participants controller when trainings button clicked', function() {
            expect(controller).toBeDefined();
            expect(toolBar).toBeDefined();

            var coachesBtn = toolBar.items.getAt(2);


            var spy = spyOn(controller, 'navigateTo');

            coachesBtn.fireEvent('click');

            expect(spy).toHaveBeenCalledWith('Participants');
        });

        it('should navigate to Rooms controller when trainings button clicked', function() {
            expect(controller).toBeDefined();
            expect(toolBar).toBeDefined();

            var coachesBtn = toolBar.items.getAt(3);


            var spy = spyOn(controller, 'navigateTo');

            coachesBtn.fireEvent('click');

            expect(spy).toHaveBeenCalledWith('Rooms');
        });

        it('should navigate to Sessions controller when trainings button clicked', function() {
            expect(controller).toBeDefined();
            expect(toolBar).toBeDefined();

            var coachesBtn = toolBar.items.getAt(4);


            var spy = spyOn(controller, 'navigateTo');

            coachesBtn.fireEvent('click');

            expect(spy).toHaveBeenCalledWith('Sessions');
        });
    });
});