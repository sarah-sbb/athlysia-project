require('dotenv').config();
require('./models/connection');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var adminsRouter = require('./routes/admins');
var groupsRouter = require('./routes/groups');
var participantsRouter = require('./routes/participants');
var eventsRouter= require('./routes/events')

var app = express();
const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admins', adminsRouter);
app.use('/groups', groupsRouter);
app.use('/participants', participantsRouter);
app.use('/events', eventsRouter)

module.exports = app;
