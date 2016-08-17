angular
    .module('acumuladorApp', [])
    .controller('wstestController', function () {
        var scope = this,
            server;
        scope.input = '';
        scope.chat = '';

        scope.send = function () {
            console.log('Enviando mensaje: ' + scope.input);
            scope.log('You: ' + scope.input);
            server.send('message', scope.input);
            scope.input = '';
        };

        scope.log = function (text) {
            console.log('Writing message chat: ' + text);
            scope.chat = scope.chat + (scope.chat !== '' ? "\n" : '') + text;
        };

        /*scope.log('Connecting...');
        console.log('Connecting...');
        server = new FancyWebSocket('ws://127.0.0.1:9300');

        //Let the user know we're connected
        server.bind('open', function() {
            scope.log( "Connected." );
            console.log('Connected.');
        });

        //OH NOES! Disconnection occurred.
        server.bind('close', function( data ) {
            scope.log( "Disconnected." );
            console.log('Disconnected.');
        });

        //Log any messages sent from server
        server.bind('message', function( payload ) {
            console.log("Receiving message: " + payload);
            scope.log( payload );
        });
        server.connect();*/
    });