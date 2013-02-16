Ext.define('TA.store.Sessions', {
    extend: 'Ext.data.Store',
    model: 'TA.model.Session',

    proxy: {
        type: 'ajax',
        url: 'trainingsessions?relations=true'
    },

    getChartData: function() {
        var data = {};

        this.each(function(record) {
            if(!data[record.getTraining().get('id')]) {
                data[record.getTraining().get('id')] = {
                    name: record.getTraining().get('name'),
                    revenue: 0,
                    participantsCount: 0
                }
            }
            data[record.getTraining().get('id')].revenue += record.getRevenue();
            data[record.getTraining().get('id')].participantsCount += record.getParticipants().count();
        }, this);

        return Ext.Object.getValues(data);
    },

    getChartDataPerTerm: function() {
        var data = {};

        this.each(function(record) {
            var date = Ext.Date.format(record.get('startDate'), record.fields.get('startDate').dateFormat);
            if(!data[date]) {
                data[date] = {
                    name: date,
                    revenue: 0,
                    participantsCount: 0
                }
            }
            data[date].revenue += record.getRevenue();
            data[date].participantsCount += record.getParticipants().count();
        }, this);

        return Ext.Object.getValues(data);
    }
});