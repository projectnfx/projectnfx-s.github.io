(function (define, angular) {
    'use strict';
    define(
            [],
            angular.module('yifyDirectives', [])
            .directive('ytsCircularProgress', ytsCircularProgress)
            .directive('navBar', navBar)
            .directive('breadcrumbs', breadcrumbs)
            .directive('searchBox', searchBox)
            .directive('pagination', pagination)
            );

    function pagination($rootScope, yifyService, $location) {
        var directive = {
            restrict: "E",
            transclude: true,
            replace: true,
            templateUrl: './ng-app/partials/pagination.html',
            controller: PaginationController,
            controllerAs: 'paginationCtrl'
        };

        function PaginationController($scope, $filter) {

            var vm = this;

        }

        return directive;
    }

    function searchBox($rootScope, yifyService, $location) {
        var directive = {
            restrict: "E",
            transclude: true,
            replace: true,
            scope: {
                collapsible: "=collapsible"
            },
            templateUrl: './ng-app/partials/search-box.html',
            controller: SearchController,
            controllerAs: 'searchCtrl',
            link: function (scope, elem, attrs) {
                console.log(scope.collapsible);
            }
        };

        function SearchController($scope, $filter) {

            var vm = this;

            vm.search = $location.search() ? $location.search() : {};

            vm.filters = {
                quality: ['720p', '1080p', '3D'],
                genre: ["all", "action", "adventure", "animation", "biography", "comedy", "crime", "documentary", "drama", "family", "fantasy", "filmnoir", "history", "horror", "music", "musical", "mystery", "news", "romance", "scifi", "short", "sport", "thriller", "war", "western", "all", "action", "adventure", "animation", "biography", "comedy", "crime", "documentary", "drama", "family", "fantasy", "filmnoir", "history", "horror", "music", "musical", "mystery", "news", "romance", "scifi", "short", "sport", "thriller", "war", "western"],
                rating: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                sort: ["latest", "oldest", "seeds", "peers", "year", "rating", "likes", "alphabetical", "downloads", "latest", "oldest", "seeds", "peers", "year", "rating", "likes", "alphabetical", "downloads"],
                order: ["asc", "desc"]
            };

            vm.doSearch = function () {
                $scope.$emit('update-search-filters', vm.search);
            };

        }

        return directive;
    }

    function breadcrumbs($rootScope) {

        var directive = {
            restrict: "E",
            transclude: true,
            replace: true,
            templateUrl: './ng-app/partials/breadcrumbs.html',
            controller: BreadCrumbController,
            controllerAs: 'breadcrumbCtrl'
        };

        function BreadCrumbController($scope, $location) {

            var vm = this;

            vm.crumbs = [
                {path: '/home', title: 'home'}
            ];

            $scope.$on('add-crumb', function (event, newCrumb) {
                for (var crumb in vm.crumbs) {
                    if (vm.crumbs[crumb].path === newCrumb.path) {
                        return;
                    }
                }
                vm.crumbs.push(newCrumb);
            });

            $scope.$on('remove-crumb', function () {
                vm.crumbs.pop();
            });

            vm.goTo = function (path) {
                $location.path(path).search();
            };

        }

        return directive;
    }

    navBar.$inject = ['$translate'];
    function navBar($translate) {
        var directive = {
            restrict: "E",
            transclude: true,
            replace: true,
            templateUrl: './ng-app/partials/nav-bar.html',
            controller: NavBarController,
            controllerAs: 'navbarCtrl'
        };

        function NavBarController() {
            var vm = this;

            $translate.use('en-us');

            vm.currentLanguage = {};

            vm.possibleLanguages = [
                'pt-br'
            ];

            vm.setLanguage = function (language) {
                $translate.use(language);
            };

        }

        return directive;
    }

    function ytsCircularProgress() {

        var directive = {
            restrict: "E",
            transclude: true,
            replace: true,
            templateUrl: './ng-app/partials/md-progress.html'
        };

        return directive;
    }

})(define, angular);
