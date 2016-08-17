SymfonyLogs = require('../models/symfonylogs');

var SymfonyLogsController = {};

// GET
SymfonyLogsController.findAllSymfonyLogs = function (req, res) {
    console.log('FIND ALL');
    SymfonyLogs.find(function (err, symfonylogs) {
        if (!err) res.send(symfonylogs);
        else console.log('ERROR: ' + err);
    });
};

//GET
SymfonyLogsController.findById = function (req, res) {
    SymfonyLogs.findById(req.params.id, function (err, symfonylog) {
        if (!err) res.send(symfonylog);
        else console.log('ERROR: ' + err);
    });
};

// POST
SymfonyLogsController.addSymfonyLog = function (req, res) {
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
};

// PUT (Update)
SymfonyLogsController.updateSymfonyLog = function (req, res) {
    console.log('PUT');
    console.log(req.body);

    SymfonyLogs.findById(req.params.id, function (err, symfonylog) {
        symfonylog.log = req.body.log;

        symfonylog.save(function (err) {
            if (!err) console.log('SymfonyLog Actualizado.');
            else console.log('ERROR: ' + err);
        })
    });
};

// DELETE
SymfonyLogsController.deleteSymfonyLog = function (req, res) {
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
};

module.exports = SymfonyLogsController;