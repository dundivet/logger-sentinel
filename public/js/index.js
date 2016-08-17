angular
    .module('acumuladorApp', [])
    .controller('acumuladorAppCtrl', function () {
        this.total = 0;
        this.counter = 0;
        this.alert = 'alert-info';

        this.sumar = function () {
            this.total+=parseInt(this.counter);
            if (this.total > 0) {
                this.alert = 'alert-success';
            }
            console.log(this.counter);
        };

        this.restar = function () {
            this.total-=parseInt(this.counter);
            if (this.total < 0) {
                this.alert = 'alert-danger';
            }
            console.log(-1*this.counter);
        };
    })
    .controller('requestCtrl', ['$http', function ($http) {
        var scope = this;
        scope.elements = {};

        console.log('instanciated');

        scope.findAll = function () {
            console.log('findAll');
            $http.get('/symfonylog/').success(function (response) {
                scope.elements = response;
            });
        };
    }]);
