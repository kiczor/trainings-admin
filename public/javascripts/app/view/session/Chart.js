Ext.define('TA.view.session.Chart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.sessionchart',

    statics: {
        DEFAULT_RENDERMODE: 'default',
        TERMS_RENDERMODE: 'terms'
    },

    renderMode: null,

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
            grid: true,
            minimum: 0,
            maximum: 500000
        },
        {
            title: 'Participants',
            type: 'Numeric',
            position: 'right',
            fields: ['participantsCount'],
            grid: true,
            minimum: 0,
            maximum: 50
        },
        {
            title: 'Training',
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
    ],

    constructor: function(config) {
        config.renderMode = config.renderMode || this.self.DEFAULT_RENDERMODE;
        this.callParent([config]);
    },

    getRenderMode: function() {
        return this.renderMode;
    },

    setRenderMode: function(renderMode, redraw) {
        renderMode = renderMode || this.renderMode;
        if(renderMode !== this.renderMode) {
            this.renderMode = renderMode;
            if(this.renderMode === this.self.TERMS_RENDERMODE) {
                this.axes.last().title = 'Terms';
            }
            else {
                this.axes.last().title = 'Trainings';
            }
            redraw = redraw || false;
            if(redraw) {
                this.redraw();
            }
        }
    }
});