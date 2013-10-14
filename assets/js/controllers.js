'use strict';

/* Controllers */

angular.module('showcase.controllers', [])
  .controller('ProjectsCtrl', ['$scope', '$routeParams', 'Project', '$location', '$rootScope', 
    function($scope, $routeParams, Project, $location, $rootScope) {

    $scope.go = function (path, projectTitle) {
      $rootScope.lastProject = projectTitle
      $rootScope.pageTurn = 'right'
      $location.path(path);
    }
        
    $scope.fromProject = $rootScope.lastProject
    $rootScope.lastProject = null
    
    Project.query(function(data) {
      $scope.projects = data
    })
    
  }])
  .controller('ProjectViewCtrl', ['$scope', '$routeParams', 'Project', '$location', '$rootScope',
    function($scope, $routeParams, Project, $location, $rootScope) {
      $scope.go = function (path) {
        $rootScope.pageTurn = 'left'
        $location.path(path);
      }
  }])