var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');
const mongoConnect = require('../db/mongoconnect');
var mongoose = require('mongoose');
console.log(mongoose.version);

mongoose.connect(mongoConnect.getMongoUri(), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false }, function (err) {
    if (err) throw err;
    console.log('MongoDB Successfully connected 3');

    // Выдает в виде массива в любом случае. Найти всех.
    Token.find({
        clientId: '5d6bfa4c874bf515c4b8db6c'
    }).sort('-created')
        .limit(5)
        .exec(function (err, token) {
            if (err) throw err;

            console.log('FindAll:');
            console.log(token);
        });

    // Найти одного
    Token.find({ clientId: '5d6bfa4c874bf515c4b8db6c' }, function (err, token) {
        if (err) throw err;
        console.log('FindOne:');
        console.log(token);
        });

    // Найти по Id
    Client.findById('5d6bfa4c874bf515c4b8db6c', function (err, client) {
        if (err) throw err;

        client.name = 'YandexDialog1';

        client.save(function (err) {
            if (err) throw err;

            console.log('Client updated 1');
        });
    });

    Client.findOneAndUpdate({ name: 'YandexDialog1'}, {name: 'YandexDialog3'}, function (err, client) {
        if (err) throw err;

        // Updated user
        console.log('Find And Update: ' + client.name);
    })

    Client.findByIdAndUpdate('5d6bfa4c874bf515c4b8db6c', { name: 'YandexDialog1' }, function (err, client) {
        if (err) throw err;

        console.log('Updated this: ' + client.name);
    });

});
