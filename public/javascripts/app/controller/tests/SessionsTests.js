describe('TA.controller.Sessions', function() {
    var controller = null;
    var app = null;

    beforeEach(function() {
        app = new TA.app.Application({
            autoCreateViewport: false
        });
        controller = app.getController('Sessions');
    });

    afterEach(function() {
        app.destroy();
        controller.destroy();
        controller = null;
    });

    describe('[constructor]', function() {

        it('should inherit from Ext.app.Controller', function() {
            expect(controller).toBeDefined();
            expect(controller instanceof Ext.app.Controller).toBeTruthy();
        });

        it('should have ref for sessions list', function() {
            expect(controller).toBeDefined();
            expect(controller.hasRef('list')).toBeTruthy();
            expect(controller.getList()).toBeDefined();
            expect(controller.getList().isXType('sessionlist')).toBeTruthy();
        });

        it('should have ref for sessions add', function() {
            expect(controller).toBeDefined();
            expect(controller.hasRef('add')).toBeTruthy();
            expect(controller.getAdd({
                record: controller.getModel('Session').create(),
                trainingsStore: Ext.create('TA.store.Trainings'),
                roomsStore: Ext.create('TA.store.Rooms'),
                coachesStore: Ext.create('TA.store.Coaches'),
                participantsStore: Ext.create('TA.store.Participants')
            })).toBeDefined();
            expect(controller.getAdd().isXType('sessionadd')).toBeTruthy();
            controller.getAdd().close()
        });

        it('should have ref for sessions edit', function() {
            expect(controller).toBeDefined();
            expect(controller.hasRef('edit')).toBeTruthy();
            expect(controller.getEdit({
                record: controller.getModel('Session').create(),
                trainingsStore: Ext.create('TA.store.Trainings'),
                roomsStore: Ext.create('TA.store.Rooms'),
                coachesStore: Ext.create('TA.store.Coaches'),
                participantsStore: Ext.create('TA.store.Participants')
            })).toBeDefined();
            expect(controller.getEdit().isXType('sessionedit')).toBeTruthy();
            controller.getEdit().close()
        });

        it('should have defined model Session', function() {
            expect(controller).toBeDefined();
            expect(typeof(controller.getModel('Session')) === 'function').toBeTruthy();
            expect(controller.getModel('Session').create() instanceof TA.model.Session).toBeTruthy();
            expect(typeof(controller.getSessionModel()) === 'function').toBeTruthy();
            expect(controller.getSessionModel().create() instanceof TA.model.Session).toBeTruthy();
        });

        it('should have defined store Sessions', function() {
            expect(controller).toBeDefined();
            expect(controller.getStore('Sessions') instanceof TA.store.Sessions).toBeTruthy();
            expect(controller.getSessionsStore() instanceof TA.store.Sessions).toBeTruthy();
        });
    });

    describe('[onLaunch]', function() {
        it('should bind with lists addsessionclick, editsessionclick, deletesessionclick events', function() {
            expect(controller).toBeDefined();

            var list = controller.getList();

            var spy = spyOn(list, 'on');

            expect(list).toBeDefined();

            controller.onLaunch();

            expect(spy.calls[0].args[0] === 'addsessionclick').toBeTruthy();
            expect(spy.calls[0].args[1] === controller.consumeListAddSessionClick).toBeTruthy();
            expect(spy.calls[0].args[2] === controller).toBeTruthy();

            expect(spy.calls[1].args[0] === 'editsessionclick').toBeTruthy();
            expect(spy.calls[1].args[1] === controller.consumeListEditSessionClick).toBeTruthy();
            expect(spy.calls[1].args[2] === controller).toBeTruthy();

            expect(spy.calls[2].args[0] === 'deletesessionclick').toBeTruthy();
            expect(spy.calls[2].args[1] === controller.consumeListDeleteSessionClick).toBeTruthy();
            expect(spy.calls[2].args[2] === controller).toBeTruthy();
        });
    });

    describe('[destroy]', function() {
        it('should unbind with lists addsessionclick, editsessionclick, deletesessionclick events', function() {
            expect(controller).toBeDefined();

            var list = controller.getList();

            expect(list).toBeDefined();

            var spy = spyOn(list, 'un');

            controller.destroy();

            expect(spy.calls[0].args[0] === 'deletesessionclick').toBeTruthy();
            expect(spy.calls[0].args[1] === controller.consumeListDeleteSessionClick).toBeTruthy();
            expect(spy.calls[0].args[2] === controller).toBeTruthy();

            expect(spy.calls[1].args[0] === 'editsessionclick').toBeTruthy();
            expect(spy.calls[1].args[1] === controller.consumeListEditSessionClick).toBeTruthy();
            expect(spy.calls[1].args[2] === controller).toBeTruthy();

            expect(spy.calls[2].args[0] === 'addsessionclick').toBeTruthy();
            expect(spy.calls[2].args[1] === controller.consumeListAddSessionClick).toBeTruthy();
            expect(spy.calls[2].args[2] === controller).toBeTruthy();
        });

        it('should destroy session list', function() {
            expect(controller).toBeDefined();

            var list = controller.getList();

            expect(list).toBeDefined();

            var spy = spyOn(list, 'destroy').andCallThrough();

            controller.destroy();

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('[execute]', function() {
        it('should load sessions store', function() {
            expect(controller).toBeDefined();
            var store = controller.getStore('Sessions');

            expect(store).toBeDefined();

            var spy = spyOn(store, 'load');

            controller.execute();

            expect(spy).toHaveBeenCalled();
        });

        it('should return sessions list view', function() {
            expect(controller).toBeDefined();

            var list = controller.getList();

            expect(list).toBeDefined();

            var view = controller.execute();

            expect(view === list).toBeTruthy();
        });
    });
});
