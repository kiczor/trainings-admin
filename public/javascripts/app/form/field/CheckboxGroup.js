Ext.define('TA.form.field.CheckboxGroup', {
    extend: 'Ext.form.CheckboxGroup',
    ailas: ['widget.ta_checkboxgroup'],

    store: null,

    valueField: 'id',
    displayField: 'name',

    name: null,

    initComponent: function() {
        this.buildItemsFromStore();
        this.callParent();
        this.store.on('load', this.consumeStoreLoad, this);
    },

    destroy: function() {
        this.store.un('load', this.consumeStoreLoad, this);
        this.callParent();
    },

    consumeStoreLoad: function(store) {
        this.buildItemsFromStore();
    },

    setValue: function(value) {
        newValue = {};
        newValue[this.name] = value;
        return this.callParent([newValue]);
    },

    buildItemsFromStore: function() {
        if(this.rendered) {
            this.removeAll(true);
            this.store.each(function(itm, idx) {
                this.items.add(Ext.create('Ext.form.field.Checkbox', {
                    boxLabel: itm.get(this.displayField),
                    name: this.name,
                    inputValue: itm.get(this.valueField)
                }));
            }, this);
            this.reset();
            this.doLayout();
        }
        else {
            this.items = [];
            this.store.each(function(itm, idx) {
                this.items.push(Ext.create('Ext.form.field.Checkbox', {
                    boxLabel: itm.get(this.displayField),
                    name: this.name,
                    inputValue: itm.get(this.valueField),
                    checked: this.value === itm.get(this.valueField)
                }));
            }, this);
        }
    }
});