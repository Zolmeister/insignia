'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('showcase.services', ['ngResource'])
  .value('version', '0.1')

  // disable auto-scroll when loading new partial
  .value('$anchorScroll', angular.noop)
  .factory('Project', ['$resource', function($resource) {
    return $resource('/project')
  }])
