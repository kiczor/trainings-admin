/*
 * GET users listing.
 */

exports.list = function (req, res) {
    var coaches = JSON.parse(JSON.stringify(require('./../public/fixtures/Coaches')));
    var sessionsCoaches = JSON.parse(JSON.stringify(require('./../public/fixtures/SessionsCoaches')));

    var result = [];

    var filter = req.query.filter ? (JSON.parse(req.query.filter)).pop() : null;

    if (filter && filter.property) {
        switch (filter.property) {
            case 'trainingSessionId':
                var coachIds = [];
                sessionsCoaches.forEach(function (sessionCoach) {
                    if (sessionCoach.sessionId == filter.value) {
                        coachIds.push(sessionCoach.coachId);
                    }
                });
                coaches.forEach(function (coach) {
                    if (coachIds.indexOf(coach.id) !== -1) {
                        result.push(coach);
                    }
                });
                break;
        }

    }
    else {
        result = coaches;
    }
    res.send(result);
};

exports.rest = {
    GET:function (req, res) {
        var coaches = require('./../public/fixtures/Coaches');
        var id = req.params.id;

        var result = null;

        coaches.forEach(function (coach) {
            if (coach.id == id) {
                result = coach;
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
        var coaches = require('./../public/fixtures/Coaches');
        var newCoach = req.body;

        newCoach.id = coaches[coaches.length - 1].id + 1;
        coaches[coaches.length] = newCoach;

        res.send(newCoach);
    },
    PUT:function (req, res) {
        var coaches = require('./../public/fixtures/Coaches');
        var newCoach = req.body;

        var recordAt = null;

        if (newCoach.id) {
            coaches.forEach(function (coach, at) {
                if (coach.id == newCoach.id) {
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
            coaches[recordAt] = newCoach;
            res.send(newCoach);
        }
    },
    DELETE:function (req, res) {
        var coaches = require('./../public/fixtures/Coaches');
        var id = req.params.id;
        var recordAt = null;

        coaches.forEach(function (coach, at) {
            if (coach.id == id) {
                recordAt = at;
                return false;
            }
        });

        if (recordAt === null) {
            res.status(404);
            res.send({success:false});
        }
        else {
            coaches.splice(recordAt, 1);
            res.send({success:true});
        }
    }
}