'use strict';

/* Controllers */

angular.module('showcase.controllers', [])
  .controller('ProjectsCtrl', ['$scope', '$routeParams', 'Project', '$location', '$rootScope', 
    function($scope, $routeParams, Project, $location, $rootScope) {
      
    $scope.newProject = function(type) {
      $scope.go('/admin/new/'+type, null)
    }
    
    $scope.edit = function(project) {
      $scope.go('/admin/edit/'+project.title, null)
    }
    
    $scope.remove = function(project) {
      if (window.confirm('Are you sure you want to remove '+project.title+'?')) {
        Project.delete(project, function(data) {
          if(data) {
            
            // remove project from local list
            $scope.projects.splice($scope.projects.indexOf(project), 1)
          }
        })
      }
    }
    
    $scope.haveAny = function(type) {
      return !!_.filter($scope.projects, {displayType: type}).length
    }
    
    $scope.go = function (path, projectTitle) {
      $rootScope.lastProject = projectTitle
      $rootScope.pageTurn = 'right'
      $location.path(path);
    }
        
    $scope.fromProject = $rootScope.lastProject
    $rootScope.lastProject = null
    $scope.projects = Project.query()
      
    
  }])
  .controller('ProjectViewCtrl', ['$scope', '$routeParams', 'Project', '$location', '$rootScope',
    function($scope, $routeParams, Project, $location, $rootScope) {
      
      // if we have a title, we are editing a project
      var isNew = !$routeParams.title
      if(isNew) {
        // create a new project
        var type = $routeParams.type || 'other'
        var project = {
          title: '',
          desc: '',
          about: '',
          displayType: type,
          technologies: [],
          pubLink: '',
          blogLink: '',
          gitHubLink: '',
          features: []
        }
        $scope.project = project
      } else {
        console.log('loaded old project')
      }
      
      $scope.save = function() {
        $scope.updateSuccess = false
        if(isNew) {

          // POST
          Project.save($scope.project, function(data){
            if(data) {
              $scope.updateSuccess = true
              $scope.go('/admin')
            }
          })
        } else {
          
          // PUT
          $scope.project.$update(function(data) {
            if(data) {
              $scope.updateSuccess = true
              $scope.go('/admin')
            }
          })
        }
      }
      
      /* todo - make this features editing thing a directive */
      $scope.addFeature = function() {
        $scope.project.features.push({value: ''})
      }
      
      $scope.removeFeature = function(feature) {
        $scope.project.features.splice($scope.project.features.indexOf(feature), 1)
      }
      
      $scope.addTech = function() {
        $scope.project.technologies.push({link: '', name: ''})
      }
      
      $scope.removeTech = function(tech) {
        $scope.project.technologies.splice($scope.project.technologies.indexOf(tech), 1)
      }
      
      Project.query({title: $routeParams.title}, function(data){
        $scope.project = data[0]
      })
      
      /*
      Project.get({title: $routeParams.title}, function(data) {
        var project = data
        if(!project) {
          $scope.error = 'Error fetching project'
        } else {
          $scope.project = project
          /*$scope.project.pubLink = $scope.project.blogLink = $scope.project.gitHubLink = 'http://sourceurl.com'
          $scope.project.technologies = [
            {link: 'http://nodejs.org', name:'node.js'},
            {link: 'http://nodejs.org', name:'node.js'},
            {link: 'http://nodejs.org', name:'node.js'},
            {link: 'http://nodejs.org', name:'node.js'},
            {link: 'http://nodejs.org', name:'node.js'}
          ]
          $scope.project.features = [
            {value:'Complete responsive rendering, same code for mobile and desktop.'},
            {value:'Major performance optimizations for mobile'},
            {value:'Fixed timestep game loop'},
            {value:'Deployed on Google Play, Chrome Web Store, Amazon App Store, Firefox Marketplace, and more'},
            {value:'Dynamic real-time irregular shape collision'}
          ]
          $scope.project.about = 'The Pond is a simple yet elegant casual game for both mobile and desktop. It leverages HTML5 canvas to create a seamless interactive experience on all platforms, and is deployed in over 4 different app markets.'
        }
      })*/
      
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