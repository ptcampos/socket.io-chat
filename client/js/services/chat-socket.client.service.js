(function () {
  'use strict';

  // materias primas factory
  angular
    .module('socketChatApp')
    .factory('chatSocket', chatSocket);

  chatSocket.$inject = ['socketFactory'];

  function chatSocket (socketFactory) {
    return socketFactory();
  }
})();
