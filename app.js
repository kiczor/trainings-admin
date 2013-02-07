/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , coach = require('./routes/coach')
    , training = require('./routes/training')
    , trainingparticipant = require('./routes/trainingparticipant')
    , trainingroom = require('./routes/trainingroom')
    , trainingsession = require('./routes/trainingsession')
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/coaches', coach.list);

app.get('/coach/:id', coach.rest.GET);
app.post('/coach/new', coach.rest.POST);
app.post('/coach/:id/update', coach.rest.PUT);
app.post('/coach/:id/delete', coach.rest.DELETE);

app.get('/coach/:id', coach.rest.GET);
app.post('/coach', coach.rest.POST);
app.put('/coach/:id', coach.rest.PUT);
app.delete('/coach/:id', coach.rest.DELETE);


app.get('/trainings', training.list);

app.get('/training/:id', training.rest.GET);
app.post('/training/new', training.rest.POST);
app.post('/training/:id/update', training.rest.PUT);
app.post('/training/:id/delete', training.rest.DELETE);

app.get('/training/:id', training.rest.GET);
app.post('/training', training.rest.POST);
app.put('/training/:id', training.rest.PUT);
app.delete('/training/:id', training.rest.DELETE);


app.get('/trainingparticipants', trainingparticipant.list);

app.get('/trainingparticipant/:id', trainingparticipant.rest.GET);
app.post('/trainingparticipant/new', trainingparticipant.rest.POST);
app.post('/trainingparticipant/:id/update', trainingparticipant.rest.PUT);
app.post('/trainingparticipant/:id/delete', trainingparticipant.rest.DELETE);

app.get('/trainingparticipant/:id', trainingparticipant.rest.GET);
app.post('/trainingparticipant', trainingparticipant.rest.POST);
app.put('/trainingparticipant/:id', trainingparticipant.rest.PUT);
app.delete('/trainingparticipant/:id', trainingparticipant.rest.DELETE);


app.get('/trainingrooms', trainingroom.list);

app.get('/trainingroom/:id', trainingroom.rest.GET);
app.post('/trainingroom', trainingroom.rest.POST);
app.post('/trainingroom/:id/update', trainingroom.rest.PUT);
app.post('/trainingroom/:id/delete', trainingroom.rest.DELETE);

app.get('/trainingroom/:id', trainingroom.rest.GET);
app.post('/trainingroom', trainingroom.rest.POST);
app.put('/trainingroom/:id', trainingroom.rest.PUT);
app.delete('/trainingroom/:id', trainingroom.rest.DELETE);


app.get('/trainingsessions', trainingsession.list);

app.get('/trainingsession/:id', trainingsession.rest.GET);
app.post('/trainingsession/new', trainingsession.rest.POST);
app.post('/trainingsession/:id/update', trainingsession.rest.PUT);
app.post('/trainingsession/:id/delete', trainingsession.rest.DELETE);

app.get('/trainingsession/:id', trainingsession.rest.GET);
app.post('/trainingsession', trainingsession.rest.POST);
app.put('/trainingsession/:id', trainingsession.rest.PUT);
app.delete('/trainingsession/:id', trainingsession.rest.DELETE);


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
