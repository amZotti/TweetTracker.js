var app = angular.module('app', []);

app.controller('mainController', function($scope, $http) {
  $http.get("/api/data").then(function(data) {
    $scope.city = data.data.city;
    $scope.keyword = data.data.keyword;
    $scope.keywords = data.data.keywords;
  });

  $scope.displayNewGraph = function(keyword) {
    $http.post("/api/keyword", {keyword: keyword})
      .success(function(data) {
        console.log(data);
      })
      .error(function(data) {
        console.log(data);
      });
  }
});
