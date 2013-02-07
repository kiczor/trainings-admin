/*
 * GET users listing.
 */

exports.list = function (req, res) {
    var trainingRooms = require('./../public/fixtures/TrainingRooms');
    res.send(trainingRooms);
};

exports.rest = {
    GET:function (req, res) {
        var trainingRooms = require('./../public/fixtures/TrainingRooms');
        var id = req.params.id;

        var result = null;

        trainingRooms.forEach(function (trainingRoom) {
            if (trainingRoom.id == id) {
                result = trainingRoom;
            }
        });
        if (null === result) {
            res.status(404);
            res.send({success:false});
        }
        else {
            res.send(result);
        }
    },
    POST:function (req, res) {
        var trainingRooms = require('./../public/fixtures/TrainingRooms');
        var newTrainingRoom = req.body;

        newTrainingRoom.id = trainingRooms[trainingRooms.length - 1].id + 1;
        trainingRooms[trainingRooms.length] = newTrainingRoom;

        res.send(newTrainingRoom);
    },
    PUT:function (req, res) {
        var trainingRooms = require('./../public/fixtures/TrainingRooms');
        var newTrainingRoom = req.body;

        var recordAt = null;

        if (newTrainingRoom.id) {
            trainingRooms.forEach(function (trainingRoom, at) {
                if (trainingRoom.id == newTrainingRoom.id) {
                    recordAt = at;
                    return false;
                }
            });
        }

        if (recordAt === null) {
            res.status(404);
            res.send({success:false});
        }
        else {
            trainingRooms[recordAt] = newTrainingRoom;
            res.send(newTrainingRoom);
        }
    },
    DELETE:function (req, res) {
        var trainingRooms = require('./../public/fixtures/TrainingRooms');
        var id = req.params.id;
        var recordAt = null;

        trainingRooms.forEach(function (trainingRoom, at) {
            if (trainingRoom.id == id) {
                recordAt = at;
                return false;
            }
        });

        if (recordAt === null) {
            res.status(404);
            res.send({success:false});
        }
        else {
            trainingRooms.splice(recordAt, 1);
            res.send('');
        }
    }
}