var app = angular.module('app', []);

app.controller('mainController', function($scope, $http) {
  $scope.getData = function() { 
    $http.get("/api/data").then(function(data) {
      console.log(data);
    });
  }
});
