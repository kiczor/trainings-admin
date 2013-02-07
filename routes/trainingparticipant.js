/*
 * GET users listing.
 */

exports.list = function (req, res) {
    var trainingParticipants = JSON.parse(JSON.stringify(require('./../public/fixtures/TrainingParticipants')));
    var sessionsParticipants = JSON.parse(JSON.stringify(require('./../public/fixtures/SessionsParticipants')));

    var result = [];

    var filter = req.query.filter ? (JSON.parse(req.query.filter)).pop() : null;

    if (filter && filter.property) {
        switch (filter.property) {
            case 'trainingSessionId':
                var participantIds = [];
                sessionsParticipants.forEach(function (sessionParticipant) {
                    if (sessionParticipant.sessionId == filter.value) {
                        participantIds.push(sessionParticipant.participantId);
                    }
                });
                trainingParticipants.forEach(function (participant) {
                    if (participantIds.indexOf(participant.id) !== -1) {
                        result.push(participant);
                    }
                });
                break;
        }

    }
    else {
        result = trainingParticipants;
    }

    res.send(result);
};

exports.rest = {
    GET:function (req, res) {
        var trainingParticipants = require('./../public/fixtures/TrainingParticipants');
        var id = req.params.id;

        var result = null;

        trainingParticipants.forEach(function (trainingParticipant) {
            if (trainingParticipant.id == id) {
                result = trainingParticipant;
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
        var trainingParticipants = require('./../public/fixtures/TrainingParticipants');
        var newTrainingParticipant = req.body;

        newTrainingParticipant.id = trainingParticipants[trainingParticipants.length - 1].id + 1;
        trainingParticipants[trainingParticipants.length] = newTrainingParticipant;

        res.send(newTrainingParticipant);
    },
    PUT:function (req, res) {
        var trainingParticipants = require('./../public/fixtures/TrainingParticipants');
        var newTrainingParticipant = req.body;

        var recordAt = null;

        if (newTrainingParticipant.id) {
            trainingParticipants.forEach(function (trainingParticipant, at) {
                if (trainingParticipant.id == newTrainingParticipant.id) {
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
            trainingParticipants[recordAt] = newTrainingParticipant;
            res.send(newTrainingParticipant);
        }
    },
    DELETE:function (req, res) {
        var trainingParticipants = require('./../public/fixtures/TrainingParticipants');
        var id = req.params.id;
        var recordAt = null;

        trainingParticipants.forEach(function (trainingParticipant, at) {
            if (trainingParticipant.id == id) {
                recordAt = at;
                return false;
            }
        });

        if (recordAt === null) {
            res.status(404);
            res.send({success:false});
        }
        else {
            trainingParticipants.splice(recordAt, 1);
            res.send('');
        }
    }
}