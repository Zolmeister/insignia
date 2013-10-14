'use strict';

/* Controllers */

angular.module('showcase.controllers', [])
  .controller('ProjectsCtrl', ['$scope', '$routeParams', 'Project', '$location', 
      function($scope, $routeParams, Project, $location) {

    console.log('route params', $routeParams)
    $scope.go = function (path) {
        $location.path(path);
    }
    $scope.showProject = function(title) {

      // find named project within our list of projects      
      var project = $scope.projects.reduce(function(finalProject, project){
        if(project.title === title) {
          finalProject = project
        }
        
        return finalProject
      }, null)

      if(!project) return $scope.viewProject = null
      
      $scope.viewProject = project
      
      console.log('showing project.....', title)
    }
    
    Project.query(function(data) {
      $scope.projects = data
    }).$promise.then(function(){
      $scope.showProject($routeParams.view)
      
      $scope.$on("$routeUpdate", function(event, route) {
        $scope.showProject(route.params.view)
      });
    })
    
    
  }])
  .controller('ProjectViewCtrl', ['$scope', '$routeParams', 'Project', '$location', 
      function($scope, $routeParams, Project, $location) {
        

  }])