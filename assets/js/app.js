'use strict';


// Declare app level module which depends on filters, and services
angular.module('insignia', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'ngCookies',
  'angularFileUpload',
  'MD5.service', 
  'gravatar.directive',
  'insignia.filters',
  'insignia.services',
  'insignia.directives',
  'insignia.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/projects.html',
    controller: 'ProjectsCtrl'
  }).when('/project/:title', {
    templateUrl: 'partials/project-view.html',
    controller: 'ProjectViewCtrl'
  }).when('/admin', {
    templateUrl: 'partials/projects-edit.html',
    controller: 'ProjectsCtrl',
    access: {
      admin: true
    }
  }).when('/admin/edit/:title', {
    templateUrl: 'partials/project-view-edit.html',
    controller: 'ProjectViewCtrl',
    access: {
      admin: true
    }
  }).when('/admin/new/:type', {
    templateUrl: 'partials/project-view-edit.html',
    controller: 'ProjectViewCtrl',
    access: {
      admin: true
    }
  }).when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  })
  .otherwise({redirectTo: '/'});
}]);
