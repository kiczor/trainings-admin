Ext.define('TA.view.session.Chart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.sessionchart',

    animate: true,
    theme: 'Category2',
    legend: {
        'revenue': 'Revenue',
        'participantsCount': 'Participants'
    },

    axes: [
        {
            title: 'Revenue',
            type: 'Numeric',
            position: 'left',
            fields: ['revenue'],
            minimum: 0,
            maximum: 500000
        },
        {
            title: 'Participants',
            type: 'Numeric',
            position: 'right',
            fields: ['participantsCount'],
            minimum: 0,
            maximum: 50
        },
        {
            title: 'Name',
            type: 'Category',
            position: 'bottom',
            fields: ['name']
        }
    ],
    series: [
        {
            type: 'column',
            xField: 'name',
            title: 'Revenue',
            axis: 'left',
            yField: 'revenue'
        },
        {
            type: 'line',
            xField: 'name',
            title: 'Participants',
            axis: 'right',
            yField: 'participantsCount'
        }
    ]
});