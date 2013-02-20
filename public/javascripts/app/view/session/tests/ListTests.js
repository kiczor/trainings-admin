describe('TA.view.session.List', function() {
    var list = null;

    var mockStore = null;

    beforeEach(function() {
        mockStore = Ext.create('TA.store.Sessions');
        list = Ext.create('TA.view.session.List', {
            renderTo: 'tests',
            store: mockStore
        });
    });

    afterEach(function() {
        list.destroy();
        list = null;
        mockStore = null;
    });

    describe('[constructor]', function(){
        it('should be defined', function(){
            expect(list).toBeDefined();
        });

        it('should be grid', function(){
            expect(list.isXType('grid')).toBeTruthy();
        });

        it('should have title', function(){
            expect(list.title === 'All sessions').toBeTruthy();
        });

        it('should have columns', function(){
            expect(list.columns[0].text === '#').toBeTruthy();
            expect(list.columns[0].isXType('rownumberer')).toBeTruthy();

            expect(list.columns[1].text === 'Training').toBeTruthy();
            expect(list.columns[1].dataIndex === 'trainingId').toBeTruthy();
            expect(list.columns[1].flex === 10).toBeTruthy();

            expect(list.columns[2].text === 'Starts at').toBeTruthy();
            expect(list.columns[2].dataIndex === 'startDate').toBeTruthy();
            expect(list.columns[2].isXType('datecolumn')).toBeTruthy();
            expect(list.columns[2].format === 'Y-m-d (l)').toBeTruthy();
            expect(list.columns[2].flex === 4).toBeTruthy();

            expect(list.columns[3].text === 'Ends at').toBeTruthy();
            expect(list.columns[3].dataIndex === 'stopDate').toBeTruthy();
            expect(list.columns[3].isXType('datecolumn')).toBeTruthy();
            expect(list.columns[3].format === 'Y-m-d (l)').toBeTruthy();
            expect(list.columns[3].flex === 4).toBeTruthy();

            expect(list.columns[4].text === 'Room').toBeTruthy();
            expect(list.columns[4].dataIndex === 'trainingRoomId').toBeTruthy();
            expect(list.columns[4].flex === 4).toBeTruthy();

            expect(list.columns[5].text === 'Coaches #').toBeTruthy();
            expect(typeof(list.columns[5].renderer) === 'function').toBeTruthy();
            expect(list.columns[5].flex === 1).toBeTruthy();

            expect(list.columns[6].text === 'Participants #').toBeTruthy();
            expect(typeof(list.columns[6].renderer) === 'function').toBeTruthy();
            expect(list.columns[6].flex === 1).toBeTruthy();

            expect(list.columns[7].text === 'Actions').toBeTruthy();
            expect(list.columns[7].isXType('actioncolumn')).toBeTruthy();
        });

        it('should have toolbar docked top', function() {
            expect(list).toBeDefined();
            expect(list.dockedItems.getAt(2)).toBeDefined();
            expect(list.dockedItems.getAt(2).isXType('toolbar')).toBeTruthy();
        });

        it('should have add session button', function() {
            expect(list).toBeDefined();
            expect(list.dockedItems.getAt(2)).toBeDefined();
            expect(list.addSessionBtn).toBeDefined();
            expect(list.addSessionBtn.isXType('button')).toBeTruthy();
            expect(list.addSessionBtn.text).toEqual('Add session');
            expect(list.dockedItems.getAt(2).items.getAt(0) === list.addSessionBtn).toBeTruthy();
        });

        it('should have edit session button', function() {
            expect(list).toBeDefined();
            expect(list.dockedItems.getAt(2)).toBeDefined();
            expect(list.editSessionBtn).toBeDefined();
            expect(list.editSessionBtn.isXType('button')).toBeTruthy();
            expect(list.editSessionBtn.text).toEqual('Edit session');
            expect(list.dockedItems.getAt(2).items.getAt(1) === list.editSessionBtn).toBeTruthy();
        });

        it('should have delete session button', function() {
            expect(list).toBeDefined();
            expect(list.dockedItems.getAt(2)).toBeDefined();
            expect(list.deleteSessionBtn).toBeDefined();
            expect(list.deleteSessionBtn.isXType('button')).toBeTruthy();
            expect(list.deleteSessionBtn.text).toEqual('Delete session');
            expect(list.dockedItems.getAt(2).items.getAt(2) === list.deleteSessionBtn).toBeTruthy();
        });

        it("should have event 'addsessionclick'", function(){
            expect(list.events['addsessionclick']).toBeDefined();
        });

        it("should have event 'editsessionclick'", function(){
            expect(list.events['editsessionclick']).toBeDefined();
        });

        it("should have event 'deletesessionclick'", function(){
            expect(list.events['deletesessionclick']).toBeDefined();
        });

    });

    describe('functional', function() {
        it('should emit addsessionclick event on add button click', function() {
            expect(list).toBeDefined();
            var btn = list.addSessionBtn;
            expect(btn).toBeDefined();

            var listener = {
                callback: function() {}
            };

            var spy = spyOn(listener, 'callback');

            list.on('addsessionclick', listener.callback, listener);

            btn.fireEvent('click');

            expect(spy).toHaveBeenCalled();
            expect(spy.mostRecentCall.args[0] === list).toBeTruthy();
        });


        it('should emit editsessionclick event on edit button click', function() {
            mockStore.load();
            waitsFor(function() {
                return mockStore.count() > 0;
            }, 'Loading data for sessions store', 3000);

            runs(function() {
                expect(list).toBeDefined();
                var btn = list.editSessionBtn;
                expect(btn).toBeDefined();
                expect(btn.disabled).toBeTruthy();

                list.getSelectionModel().select(0);

                expect(btn.disabled).toBeFalsy();

                var listener = {
                    callback: function() {}
                };

                var spy = spyOn(listener, 'callback');

                list.on('editsessionclick', listener.callback, listener);

                btn.fireEvent('click');

                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0] === list).toBeTruthy();
            });
        });


        it('should emit deletesessionclick event on delete button click', function() {
            mockStore.load();
            waitsFor(function() {
                return mockStore.count() > 0;
            }, 'Loading data for sessions store', 3000);

            runs(function() {
                expect(list).toBeDefined();
                var btn = list.deleteSessionBtn;
                expect(btn).toBeDefined();
                expect(btn.disabled).toBeTruthy();

                list.getSelectionModel().select(0);

                expect(btn.disabled).toBeFalsy();

                var listener = {
                    callback: function() {}
                };

                var spy = spyOn(listener, 'callback');

                list.on('deletesessionclick', listener.callback, listener);

                btn.fireEvent('click');

                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0] === list).toBeTruthy();
            });
        });

        it('should emit editsessionclick event on edit action button click', function() {
            mockStore.load();
            waitsFor(function() {
                return mockStore.count() > 0;
            }, 'Loading data for sessions store', 3000);

            runs(function() {
                actionElems = list.getEl().select('.x-action-col-0');
                expect(actionElems.getCount()).toEqual(mockStore.count());

                var listener = {
                    callback: function() {}
                };

                var spy = spyOn(listener, 'callback');

                list.on('editsessionclick', listener.callback, listener);

                actionElems.each(function(el) {
                    $(el.dom).trigger('click');
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0] === list).toBeTruthy();
                }, this);

            });
        });

        it('should emit deletesessionclick event on delete action button click', function() {
            mockStore.load();
            waitsFor(function() {
                return mockStore.count() > 0;
            }, 'Loading data for sessions store', 3000);

            runs(function() {
                actionElems = list.getEl().select('.x-action-col-1');
                expect(actionElems.getCount()).toEqual(mockStore.count());

                var listener = {
                    callback: function() {}
                };

                var spy = spyOn(listener, 'callback');

                list.on('deletesessionclick', listener.callback, listener);

                actionElems.each(function(el) {
                    $(el.dom).trigger('click');
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0] === list).toBeTruthy();
                }, this);

            });
        });
    });
});