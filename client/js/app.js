var socketChatApp = angular.module('socketChatApp', ['btford.socket-io', 'ngResource', 'ui.router', 'ngMessages', 'ui.utils.masks'])

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  // For any unmatched url, redirect to /main
  $urlRouterProvider.otherwise('/main/home');

  $stateProvider
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: '/views/main/main.client.view.html',
      controller: 'MainController',
      controllerAs: 'mc'
    })
    .state('main.home', {
        url: '/home',
          views: {
          'mainView': {
            templateUrl: '/views/main/home.client.view.html',
            controller: 'HomeController',
                controllerAs: 'hc'
          }
      },
    });
});

socketChatApp.run(['$rootScope', '$state', '$window', function($rootScope, $state, $window) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

    $state.previous = fromState;
    $state.previousParams = fromParams;

    $rootScope.$broadcast('changed-url', { toUrl: toState.url, toStateName: toState.name });

    window.scrollTo(0,0);

  });
}]);