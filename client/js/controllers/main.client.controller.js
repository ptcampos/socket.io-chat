(function () {
  'use strict';

  // Main controller
  angular
    .module('socketChatApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$state'];

  function MainController ($scope, $state) {
    var mc = this;

    mc.locationName = $state.current.name;

    $scope.$on('changed-url', function(event, args) {
      mc.locationName = args.toStateName;
    });
  }
})();
