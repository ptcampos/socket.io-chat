(function () {
  'use strict';

  // Main controller
  angular
    .module('socketChatApp')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$state', 'chatSocket'];

  function HomeController ($scope, $state, chatSocket) {
    var hc = this;

    hc.loading = true;
    hc.init = init;
    hc.messages = [];
    hc.userMessage = '';
    hc.sendMessage = sendMessage;

    chatSocket.on('message', function(data){
      console.log(data);
      hc.messages = data.messages;
    });

    function sendMessage()
    {
      chatSocket.emit('message', {
        message: hc.userMessage
      });

      hc.userMessage = '';
    }

    function init()
    {
    	//initial config.
    }
  }
})();
