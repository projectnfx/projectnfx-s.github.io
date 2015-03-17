(function (define, angular) {
    'use strict';
    define(
            [],
            angular.module('yifyControllers', [])
            .controller('TopBarController', TopBarController)
            .controller('HomeController', HomeController)
            .controller('ListController', ListController)
            .controller('DetailController', DetailController)
            );

    function TopBarController($rootScope, $scope, $q) {

        var vm = this;

    }

    function DetailController($rootScope, $routeParams, $scope, $location, yifyService) {
        var vm = this;

        vm.movie = {};

        vm.query = {
            movie_id: $routeParams.id,
            with_images: true,
            with_cast: true
        };

        yifyService.Detail.get(vm.query).$promise.then(function (response) {
            vm.movie = response.data;
        });

    }

    function ListController($rootScope, $scope, $location, yifyService) {
        var vm = this;

        vm.results = {};

        vm.search = $location.search() ? $location.search() : {};

        $scope.$emit('add-crumb', {path: '/list', title: 'search_results'});

        vm.doList = function () {
            yifyService.List.get(vm.search)
                    .$promise.then(function (response) {
                        vm.results = response.data;
                    });
        };

        vm.detail = function (movieId) {
            $location.path("/details/" + movieId);
        };

        vm.getMagnetLink = function (hash, movieName) {
            var encodedMovieName = encodeURI(movieName);
            return 'magnet:?xt=urn:btih:' + hash + '&dn=' + encodedMovieName + '&tr=http://track.one:1234/announce&tr=udp://track.two:80';
        };

        $scope.$on('update-search-filters', function (event, query) {
            vm.search = query;
            vm.doList();
        });

        vm.goMagnet = function (hash, movieName) {
            window.location = vm.getMagnetLink(hash, movieName);
        };

        vm.doList();
    }

    function HomeController($rootScope, $scope, yifyService, $location) {
        var vm = this;

        vm.upcomings = [];

        vm.getUpcoming = function () {
            yifyService.Upcoming.get()
                    .$promise.then(function (response) {
                        vm.upcomings = response.data.upcoming_movies;
                    });
        };

        vm.toImdb = function (imdbCode) {
            window.location = 'http://www.imdb.com/title/' + imdbCode
        };

        $scope.$on('update-search-filters', function (event, query) {
            $location.path('/list').search(query);
        });

        vm.getUpcoming();

    }

})(define, angular);
