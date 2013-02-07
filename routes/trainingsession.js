/*
 * GET users listing.
 */

exports.list = function (req, res) {
    var trainingSessions = JSON.parse(JSON.stringify(require('./../public/fixtures/TrainingSessions')));

    var result = [];

    var filter = req.query.filter && (JSON.parse(req.query.filter)[0] || null);

    if (filter) {
        trainingSessions.forEach(function (trainingSession, idx) {
            if (trainingSession[filter.property] == filter.value) {
                result.push(trainingSession);
            }
        });
    }
    else {
        result = trainingSessions;
    }

    var relations = req.query.relations || null;

    if (relations) {
        var trainings = JSON.parse(JSON.stringify(require('./../public/fixtures/Trainings')));
        result.forEach(function (trainingSession) {
            trainings.forEach(function (training) {
                if (trainingSession.trainingId == training.id) {
                    trainingSession.training = training;
                    return false;
                }
            });
        });


        var trainingRooms = JSON.parse(JSON.stringify(require('./../public/fixtures/TrainingRooms')));
        result.forEach(function (trainingSession) {
            trainingRooms.forEach(function (trainingRoom) {
                if (trainingSession.trainingRoomId == trainingRoom.id) {
                    trainingSession.trainingRoom = trainingRoom;
                    return false;
                }
            });
        });

        var trainingParticipants = JSON.parse(JSON.stringify(require('./../public/fixtures/TrainingParticipants')));
        var sessionsParticipants = JSON.parse(JSON.stringify(require('./../public/fixtures/SessionsParticipants')));
        var coaches = JSON.parse(JSON.stringify(require('./../public/fixtures/Coaches')));
        var sessionsCoaches = JSON.parse(JSON.stringify(require('./../public/fixtures/SessionsCoaches')));
        result.forEach(function (trainingSession) {
            var sessionParticipants = [];
            sessionsParticipants.forEach(function (sessionParticipant) {
                if (trainingSession.id == sessionParticipant.sessionId) {
                    sessionParticipants.push(sessionParticipant.participantId);
                }
            });

            trainingParticipants.forEach(function (trainingParticipant) {
                if (sessionParticipants.indexOf(trainingParticipant.id) !== -1) {
                    trainingSession.participants = trainingSession.participants || [];
                    trainingSession.participants.push(trainingParticipant);
                }
            });

            var sessionCoaches = [];
            sessionsCoaches.forEach(function (sessionCoach) {
                if (trainingSession.id == sessionCoach.sessionId) {
                    sessionCoaches.push(sessionCoach.coachId);
                }
            });

            coaches.forEach(function (coach) {
                if (sessionCoaches.indexOf(coach.id) !== -1) {
                    trainingSession.coaches = trainingSession.coaches || [];
                    trainingSession.coaches.push(coach);
                }
            });
        });

    }

    res.send(result);
};

exports.fastList = function (req, res) {
    var trainingSessions = JSON.parse(JSON.stringify(require('./../public/fixtures/TrainingSessions')));

    var result = {};

    var filter = req.query.filter && (JSON.parse(req.query.filter)[0] || null);

    if (filter) {
        trainingSessions.forEach(function (trainingSession, idx) {
            if (trainingSession[filter.property] == filter.value) {
                result.sessions = result.sessions || [];
                result.sessions.push(trainingSession);
            }
        });
    }
    else {
        result.sessions = trainingSessions;
    }

    var relations = req.query.relations || null;

    if (relations) {
        var trainings = JSON.parse(JSON.stringify(require('./../public/fixtures/Trainings')));
        result.sessions.forEach(function (trainingSession) {
            trainings.forEach(function (training) {
                if (trainingSession.trainingId == training.id) {
                    result.trainings = result.trainings || [];
                    result.trainings.push(training);
                    return false;
                }
            });
        });


        var trainingRooms = JSON.parse(JSON.stringify(require('./../public/fixtures/TrainingRooms')));
        result.sessions.forEach(function (trainingSession) {
            trainingRooms.forEach(function (trainingRoom) {
                if (trainingSession.trainingRoomId == trainingRoom.id) {
                    result.rooms = result.rooms || [];
                    result.rooms.push(trainingRoom);
                    return false;
                }
            });
        });

        var trainingParticipants = JSON.parse(JSON.stringify(require('./../public/fixtures/TrainingParticipants')));
        var sessionsParticipants = JSON.parse(JSON.stringify(require('./../public/fixtures/SessionsParticipants')));
        var coaches = JSON.parse(JSON.stringify(require('./../public/fixtures/Coaches')));
        var sessionsCoaches = JSON.parse(JSON.stringify(require('./../public/fixtures/SessionsCoaches')));
        result.sessions.forEach(function (trainingSession) {
            var sessionParticipants = [];
            sessionsParticipants.forEach(function (sessionParticipant) {
                if (trainingSession.id == sessionParticipant.sessionId) {
                    sessionParticipants.push(sessionParticipant.participantId);
                }
            });

            trainingSession.participants = sessionParticipants;


            trainingParticipants.forEach(function (trainingParticipant) {
                if (sessionParticipants.indexOf(trainingParticipant.id) !== -1) {
                    result.participants = result.participants || [];
                    result.participants.push(trainingParticipant);
                }
            });

            var sessionCoaches = [];
            sessionsCoaches.forEach(function (sessionCoach) {
                if (trainingSession.id == sessionCoach.sessionId) {
                    sessionCoaches.push(sessionCoach.coachId);
                }
            });

            trainingSession.coaches = sessionCoaches;

            coaches.forEach(function (coach) {
                if (sessionCoaches.indexOf(coach.id) !== -1) {
                    result.coaches = result.coaches || [];
                    result.coaches.push(coach);
                }
            });
        });

    }

    res.send(result);
};

exports.rest = {
    GET:function (req, res) {
        var trainingSessions = require('./../public/fixtures/TrainingSessions');
        var id = req.params.id;

        var result = null;

        trainingSessions.forEach(function (trainingSession) {
            if (trainingSession.id == id) {
                result = trainingSession;
            }
        });


        var relations = req.query.relations || true;

        if (relations) {
            var trainings = JSON.parse(JSON.stringify(require('./../public/fixtures/Trainings')));
            trainings.forEach(function (training) {
                if (result.trainingId == training.id) {
                    result.training = training;
                    return false;
                }
            });
        }

        res.send(result);

        if (null === result) {
            res.status(404);
            res.send({success:false});
        }
        else {
            res.send(result);
        }
    },
    POST:function (req, res) {
        var trainingRooms = require('./../public/fixtures/TrainingSessions');
        var sessionsParticipants = require('./../public/fixtures/SessionsParticipants');
        var sessionsCoaches = require('./../public/fixtures/SessionsCoaches');
        var newTrainingSession = req.body;

        var participants = newTrainingSession.participants;
        delete newTrainingSession.participants;

        var coaches = newTrainingSession.coaches;
        delete newTrainingSession.coaches;

        newTrainingSession.id = trainingRooms[trainingRooms.length - 1].id + 1;
        trainingRooms[trainingRooms.length] = newTrainingSession;

        if(coaches && coaches.length) {
            coaches.forEach(function (coachId) {
                sessionsCoaches.push({sessionId:newTrainingSession.id, coachId:coachId | 0});
            });
        }

        if(participants && participants.length) {
            participants.forEach(function (participantId) {
                sessionsParticipants.push({sessionId:newTrainingSession.id, participantId:participantId | 0});
            });
        }

        res.send({success:true, data:newTrainingSession});
    },
    PUT:function (req, res) {
        var trainingSessions = require('./../public/fixtures/TrainingSessions');
        var sessionsParticipants = require('./../public/fixtures/SessionsParticipants');
        var sessionsCoaches = require('./../public/fixtures/SessionsCoaches');
        var newTrainingSession = req.body;

        var recordAt = null;

        var participants = newTrainingSession.participants;
        delete newTrainingSession.participants;

        var coaches = newTrainingSession.coaches;
        delete newTrainingSession.coaches;

        if (newTrainingSession.id) {
            trainingSessions.forEach(function (trainingSession, at) {
                if (trainingSession.id == newTrainingSession.id) {
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
            if(coaches && coaches.length) {
                coaches.forEach(function (coachId) {
                    sessionsCoaches.push({sessionId:newTrainingSession.id, coachId:coachId | 0});
                });
            }

            if(participants && participants.length) {
                participants.forEach(function (participantId) {
                    sessionsParticipants.push({sessionId:newTrainingSession.id, participantId:participantId | 0});
                });
            }

            trainingSessions[recordAt] = newTrainingSession;
            res.send({success:true, data:newTrainingSession});
        }
    },
    DELETE:function (req, res) {
        var trainingSessions = require('./../public/fixtures/TrainingSessions');
        var id = req.params.id;
        var recordAt = null;

        trainingSessions.forEach(function (trainingSession, at) {
            if (trainingSession.id == id) {
                recordAt = at;
                return false;
            }
        });

        if (recordAt === null) {
            res.status(404);
            res.send({success:false});
        }
        else {
            trainingSessions.splice(recordAt, 1);
            res.send({success:true});
        }
    }
}