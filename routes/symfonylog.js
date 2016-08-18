module.exports = function (app) {
    "use strict";

    var SymfonyLogs = require('../models/symfonylogs'),
        router = require('express').Router();

    router.get('/', function (req, res) {
        console.log('FIND ALL');
        SymfonyLogs.find(function (err, symfonylogs) {
            if (!err) res.send(symfonylogs);
            else console.log('ERROR: ' + err);
        });
    });

    router.get('/:id', function (req, res) {
        SymfonyLogs.findById(req.params.id, function (err, symfonylog) {
            if (!err) res.send(symfonylog);
            else console.log('ERROR: ' + err);
        });
    });

    router.post('/', function (req, res) {
        console.log('POST');
        console.log(req.body);

        var symfonylog = new SymfonyLogs({
            log: req.body.log
        });

        symfonylog.save(function (err) {
            if (!err) console.log('SymfonyLog Guardado.');
            else console.log('ERROR: ' + err);
        });

        res.send(symfonylog);
    });

    router.put('/:id', function (req, res) {
        console.log('PUT');
        console.log(req.body);

        SymfonyLogs.findById(req.params.id, function (err, symfonylog) {
            symfonylog.log = req.body.log;

            symfonylog.save(function (err) {
                if (!err) console.log('SymfonyLog Actualizado.');
                else console.log('ERROR: ' + err);
            })
        });
    });

    router.delete('/:id', function (req, res) {
        console.log('DELETE');

        SymfonyLogs.findById(req.params.id, function (err, symfonylog) {
            if (err) console.log('ERROR: ' + err);
            else if (symfonylog !== null) {
                symfonylog.remove(function (err) {
                    if (!err) console.log('SymfonyLog Eliminado.');
                    else console.log('ERROR: ' + err);
                });
            }
        })
    });

    router.delete('/', function (req, res) {
        console.log('DELETE ALL');

        SymfonyLogs.remove(function (err) {
            if (!err) console.log('Se han eliminado todos los registros de forma satisfactoria.');
            else console.error('ERROR: ' +  err);
        });
    });

    app.use('/symfonylog', router);
};