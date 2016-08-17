#!/usr/bin/env node

var amqp = require('amqplib'),
    mongoose = require('mongoose'),
    SymfonyLog = require('./../models/symfonylogs');

mongoose.connect('mongodb://localhost/symfonylogs', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }

    amqp.connect('amqp://localhost').then(function(conn) {
        //process.once('SIGINT', function() { conn.close(); });

        return conn.createChannel().then(function(ch) {

            var ok = ch.assertQueue('hello', {durable: false});

            ok = ok.then(function(_qok) {
                return ch.consume('hello', function(msg) {
                    var log = new SymfonyLog({
                        log: msg.content.toString()
                    });

                    log.save(function(err, log) {
                        if(err) console.log('ERROR: Persistiendo log. ' + err);
                        console.log('[X] Persisted msg.');
                    });

                    //console.log(" [x] Received '%s'", msg.content.toString());
                }, {noAck: true});
            });

            return ok.then(function(_consumeOk) {
                console.log(' [*] Waiting for messages. To exit press CTRL+C');
            });
        });
    }).then(null, console.warn);
});
