Ext.define('TA.reader.FastJsonSessions', {
    extend: 'Ext.data.reader.Json',
    alias : 'reader.ta_fastjson_sessions',
    localRoot: 'sessions',

    extractData: function(root) {
        var hashMaps = {};
        var result = root[this.localRoot];

        Ext.Object.each(root, function(key, value) {
            if(key !== this.localRoot) {
                hashMaps[key] = this.convertToHashMap(value);
            }
        }, this);

        Ext.Array.each(result, function(itm) {
            if(itm.trainingId) {
                itm.training = hashMaps.trainings[itm.trainingId];
            }
            if(itm.trainingRoomId) {
                itm.trainingRoom = hashMaps.rooms[itm.trainingRoomId];
            }
            if(itm.coaches) {
                itm.coaches = this.extractByKeys(itm.coaches, hashMaps.coaches);
            }
            if(itm.participants) {
                itm.participants = this.extractByKeys(itm.participants, hashMaps.participants);
            }
        }, this);

        return this.callParent([result]);
    },

    convertToHashMap: function(array, idField) {
        idField = idField || 'id';
        var result = {};

        Ext.Array.each(array, function(itm) {
            result[itm[idField]] = itm;
        });

        return result;
    },

    extractByKeys: function(keys, hashMap) {
        var result = [];

        Ext.Array.each(keys, function(itm) {
            if(hashMap[itm]) {
                result.push(hashMap[itm]);
            }
        }, this);

        return result;

    }
});