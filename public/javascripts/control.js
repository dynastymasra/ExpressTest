angular.module('expressnode', []).controller('mainController', function($scope, $http) {
  $scope.todoData = {};
  $scope.userData = {};

  $scope.sendPostTodo = function() {
      var data = {
        id: $scope.id,
        title: $scope.title,
        description: $scope.desc,
        todo: true,
        progress: false,
        done: false
      }
      $http.post("/api/v1/create/todo", data).success(function(data, status) {
          $scope.todoData = data;
      });
  }

  $http.get('/api/v1/read/user').success(function(data) {
    $scope.userData = data;
  }).error(function(err) {
    console.error('error', err);
  });

  $http.get('/api/v1/read/todo').success(function(data) {
    $scope.todoData = data;
  }).error(function(err) {
    console.error('error', err);
  });

  $scope.deleteTodo = function(exId) {
    $http.delete('/api/v1/delete/todo/' + exId).success(function(data) {
      $scope.todoData = data;
    }).error(function(err) {
      console.error('error', err);
    });
  };

  $scope.deleteUser = function(exId) {
    $http.delete('/api/v1/delete/user/' + exId).success(function(data) {
      $scope.userData = data;
    }).error(function(err) {
      console.error('error', err);
    });
  };

  $scope.sendPostUser = function() {
    var data = {
      idUser: $scope.idUser,
      idNo: $scope.idNo,
      name: $scope.name,
      email: $scope.email,
      phone: $scope.phone
    }
    $http.post("/api/v1/create/user", data).success(function(data, status) {
        $scope.userData = data;
    });
  }
});
