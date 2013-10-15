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
      if(!data) {
        $scope.error = 'Error fetching projects'
      } else {
        $scope.projects = data
      }
    })
    
  }])
  .controller('ProjectViewCtrl', ['$scope', '$routeParams', 'Project', '$location', '$rootScope',
    function($scope, $routeParams, Project, $location, $rootScope) {
      Project.get({title:'anotherTitle'}, function(data) {
        var project = data[0]
        if(!project) {
          $scope.error = 'Error fetching project'
        } else {
          $scope.project = project
          $scope.project.pubLink = $scope.project.blogLink = $scope.project.gitHubLink = 'http://sourceurl.com'
          $scope.project.technologies = [
            {link: 'http://nodejs.org', name:'node.js'},
            {link: 'http://nodejs.org', name:'node.js'},
            {link: 'http://nodejs.org', name:'node.js'},
            {link: 'http://nodejs.org', name:'node.js'},
            {link: 'http://nodejs.org', name:'node.js'}
          ]
          $scope.project.features = [
            'Complete responsive rendering, same code for mobile and desktop.',
            'Major performance optimizations for mobile',
            'Fixed timestep game loop',
            'Deployed on Google Play, Chrome Web Store, Amazon App Store, Firefox Marketplace, and more',
            'Dynamic real-time irregular shape collision'
          ]
          $scope.project.about = 'The Pond is a simple yet elegant casual game for both mobile and desktop. It leverages HTML5 canvas to create a seamless interactive experience on all platforms, and is deployed in over 4 different app markets.'
        }
      })
      $scope.go = function (path) {
        $rootScope.pageTurn = 'left'
        $location.path(path);
      }
  }]).controller('MenuCtrl', ['$scope', 'User', '$location', function($scope, User, $location){
    
    // load user data from server
    function getUserInfo(data) {
      if(!data) {
        $scope.error = 'Error fetching user info'
      } else {
        $scope.info = data
        $scope.info.email = decodeURIComponent($scope.info.encodedEmail)
      }
    }
    
    // .get() uses function.length, so we must wrap the compose
    User.get(function(data){
      return _.compose(getUserInfo, _.first)(data)
    })
    
    $scope.save = function() {
      
      $scope.updateSuccess = false
      
      // $scope.info hs our data, PUT it up
      $scope.info.$update(function(data){
        if(data) {
          getUserInfo(data)
          $scope.updateSuccess = true
        }
      })
    }
    
    $scope.$location = $location
  }])