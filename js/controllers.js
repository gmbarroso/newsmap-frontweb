angular.module('starter.controllers', [])

.controller('homeCtrl', function($scope, $state) {
  $scope.home = [
    {id: 1, title: 'home', pagina: 'home'},
    {id: 1, title: 'login', pagina: 'login'},
    {id: 1, title: 'personalizar', pagina: 'personalizar'},
    {id: 1, title: 'logout', pagina: 'logout'},
  ];

  $scope.acessar = function(pagina){
    $state.go('app.'+ pagina);
  }
})
