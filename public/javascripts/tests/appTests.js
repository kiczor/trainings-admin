describe('TA', function() {
    var app = null;

    beforeEach(function() {
        app = new TA.app.Application({
            autoCreateViewport: false
        });
    });

    afterEach(function() {
        app.destroy();
        app = null;
    });

    it('should have proper name', function() {
        expect(app).toBeDefined();
        expect(app.name).toEqual('TA');
    });

    it('should have proper appFolder set', function() {
        expect(app).toBeDefined();
        expect(app.appFolder).toEqual('javascripts/app');
    });

    it('should have Sessions controller', function() {
        expect(app).toBeDefined();
        expect(app.getController('Sessions')).toBeDefined();
        expect(app.getController('Sessions') instanceof TA.controller.Sessions).toBeTruthy();
    });
});