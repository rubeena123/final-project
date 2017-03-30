angular.module('starter.controllers')
.controller('LoginCtrl', function($scope,$http,$state) {
    $scope.logindata = {};
    $scope.registerdata ={};

    $scope.user = JSON.parse( localStorage.getItem('user') )
    if($scope.user){
      $state.go('tab.dash')
    }
    $scope.login = function() {
        // console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        $http({
            method : 'POST',
            url : 'http://10.25.15.32:3000/login',
            data : {
                username : $scope.logindata.username,
                password : $scope.logindata.password
            }

        })
        .then(function(response){
            localStorage.setItem('user', JSON.stringify(response.data))
            $state.go('tab.dash')
        })
    }
    $scope.register = function() {
        // console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        $http({
            method : 'POST',
            url : 'http://localhost:3000/register',
            data : {
                username : $scope.registerdata.username,
                password : $scope.registerdata.password
            }

        })
        .then(function(response){
            localStorage.setItem('user', JSON.stringify(response.data))
            $state.go('tab.dash')
        })
    }


})
