(function (define, angular) {
    'use strict';

    define(
            ['angular-resource'],
            angular.module('yifyServices', ['ngResource'])
            .factory('yifyService', yifyService)
            );
    /**
     * Serch Service
     */
    yifyService.$inject = ['$resource'];
    function yifyService($resource) {
        return {
            List: $resource('https://yts.re/api/v2/list_movies.json', {}, {}),
            Detail: $resource('https://yts.re/api/v2/movie_details.json', {}, {}),
            Upcoming: $resource('https://yts.re/api/v2/list_upcoming.json', {}, {})
        };
    }

})(define, angular);