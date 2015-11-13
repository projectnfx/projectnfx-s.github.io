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

        // Temporary fix. Should test all three and use only the available
        var endPoints = [
            'https://yts.ag/api/',
            'https://yts.re/api/',
            'https://yts.pm/api/',
            'https://yts.io/api/'
        ];

        var currentEndPoint = 0;

        return {
            List: $resource(endPoints[currentEndPoint] + 'v2/list_movies.json', {}, {}),
            Detail: $resource(endPoints[currentEndPoint] + 'v2/movie_details.json', {}, {}),
            Upcoming: $resource(endPoints[currentEndPoint] + 'v2/list_upcoming.json', {}, {})
        };
    }

})(define, angular);
