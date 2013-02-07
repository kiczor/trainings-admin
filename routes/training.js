/*
 * GET users listing.
 */

exports.list = function (req, res) {
    var trainings = JSON.parse(JSON.stringify(require('./../public/fixtures/Trainings')));

    var id = req.query.id|0;

    var result = [];

    if (id) {
        var found = null;
        trainings.forEach(function (itm) {
            if (itm.id == id) {
                found = itm;
                return false;
            }
        });

        result = found;
    }
    else {
        result = trainings;
    }

    var relations = req.query.relations || null;

    if (relations) {
        result.forEach(function (training) {
            var trainingSessions = JSON.parse(JSON.stringify(require('./../public/fixtures/TrainingSessions')));

            var trainingSessionsResult = [];
            trainingSessions.forEach(function (trainingSession) {
                if (trainingSession.trainingId == training.id) {
                    trainingSessionsResult.push(trainingSession);
                }
            });

            if (trainingSessionsResult.length) {
                training.sessions = trainingSessionsResult;
            }
        });
    }

    res.send(result);
};

exports.rest = {
    GET:function (req, res) {
        var trainings = require('./../public/fixtures/Trainings');

        var id = req.params.id;

        var result = null;

        trainings.forEach(function (training) {
            if (training.id == id) {
                result = training;
            }
        });

        var relations = req.query.relations || null;

        if (relations) {
            var trainingSessions = JSON.parse(JSON.stringify(require('./../public/fixtures/TrainingSessions')));
            var trainingSessionsResult = [];
            trainingSessions.forEach(function (trainingSession) {
                if (trainingSession.trainingId == result.id) {
                    trainingSessionsResult.push(trainingSession);
                }
            });

            if (trainingSessionsResult.length) {
                result.trainingSessions = trainingSessionsResult;
            }
        }

        if (null === result) {
            res.status(404);
            res.send({success:false});
        }
        else {
            res.send(result);
        }
    },
    POST:function (req, res) {
        var trainings = require('./../public/fixtures/Trainings');
        var newTraining = req.body;

        newTraining.id = trainings[trainings.length - 1].id + 1;
        trainings[trainings.length] = newTraining;

        res.send(newTraining);
    },
    PUT:function (req, res) {
        var trainings = require('./../public/fixtures/Trainings');
        var newTraining = req.body;

        var recordAt = null;

        if (newTraining.id) {
            trainings.forEach(function (training, at) {
                if (training.id == newTraining.id) {
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
            trainings[recordAt] = newTraining;
            res.send(newTraining);
        }
    },
    DELETE:function (req, res) {
        var trainings = require('./../public/fixtures/Trainings');
        var id = req.params.id;
        var recordAt = null;

        trainings.forEach(function (training, at) {
            if (training.id == id) {
                recordAt = at;
                return false;
            }
        });

        if (recordAt === null) {
            res.status(404);
            res.send({success:false});
        }
        else {
            trainings.splice(recordAt, 1);
            res.send({success:true});
        }
    }
}