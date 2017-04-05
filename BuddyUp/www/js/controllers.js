angular.module('starter.controllers', [])
.config(function($httpProvider){
  $httpProvider.defaults.withCredentials=true;
})
.controller('DashCtrl', function($scope,$http, $state, $cordovaVibration) {
  // console.log('CONTROLLER RUNNING');

  $scope.user = JSON.parse( localStorage.getItem('user') )

  $scope.$on('$ionicView.enter', function(){
    $scope.user = JSON.parse( localStorage.getItem('user') )

    if(!$scope.maxvalue){
    $scope.maxvalue=parseInt( prompt("Enter your steps goal for the day:") );
    if($scope.user){
      $scope.user.maxSteps = $scope.maxvalue;
      $http({
          method : 'POST',
          url    : 'http://104.236.155.62:3000/api/user/'+$scope.user._id,
          data   : $scope.user

        })
    }
  }
  })

  $scope.removeMe = function(user){
    if($scope.user){
    return user._id !== $scope.user._id
    }
    else {
      return true
    }
  }

$scope.percent=function(steps, max){
  // console.log(steps);
  // console.log(Math.floor((steps/ 6000) * 100))
  var perc = Math.floor((steps/ max) * 100)

  return perc
}

$scope.finish=function(percent){
  if(percent >= 100){
    return $cordovaVibration.vibrate(2000);
  }
else{
  return false
}
}

$scope.maxvalue=parseInt( prompt("Enter your steps goal for the day:") );
if($scope.user){
  $scope.user.maxSteps = $scope.maxvalue;
  $http({
      method : 'POST',
      url    : 'http://104.236.155.62:3000/api/user/'+$scope.user._id,
      data   : $scope.user

    })
}


  $http({
        method : 'GET',
        url    : 'http://104.236.155.62:3000/api/user'
      })


      .then(function(responseData){
        console.log(responseData.data);
        $scope.userList = responseData.data; // attaching data to the controller
      });





      document.addEventListener('deviceready', function () {
        cordova.plugins.backgroundMode.enable();
        // cordova.plugins.backgroundMode.moveToBackground()
        // cordova.plugins.backgroundMode.disable();
        setTimeout(function(){
          console.log('BG', cordova.plugins.backgroundMode.isActive());
        }, 5000)


          // var success = function (message) {
          //     console.log(message)
          // }
          //
          // var failure = function () {
          //     console.log("Error calling CordovaStepCounter Plugin! :(");
          // }
          //
          // // Start the step counter
          // // startingOffset will be added to the total steps counted in this session.
          // // ie. say you have already recorded 150 steps for a certain activity, then
          // // the step counter records 50. The getStepCount method will then return 200.
          // var startingOffset = 0;
          // stepcounter.start(startingOffset, success, failure);
          //
          // // Stop the step counter
          // // stepcounter.stop(success, failure);
          //
          // // Get the amount of steps for today (or -1 if it no data given)
          // stepcounter.getTodayStepCount(success, failure);
          //
          //
          // // Get the amount of steps since the start command has been called
          // stepcounter.getStepCount(success, failure);

          // Returns true/false if Android device is running >API level 19 && has the step counter API available
          // stepcounter.deviceCanCountSteps(success, failure);

          // Get the step history (JavaScript object)
          // sample result :
          //{
          //  "2015-01-01":{"offset": 123, "steps": 456},
          //  "2015-01-02":{"offset": 579, "steps": 789}
          //  ...
          //}

          function getSteps () {
            stepcounter.getTodayStepCount(
                function (historyData) {
                    console.log('HISTORY!', historyData)

                    // for(var key in historyData){
                    //   console.log(key, historyData[key].steps)
                    //   $scope.history=historyData[key].steps;
                    //
                    // }
                    $scope.history = historyData

                    // alert($scope.history)
                    $scope.$apply()
                    // console.log($scope)
                    if(needFinish){
                      $scope.finish(($scope.history / $scope.maxvalue) * 100);
                      needFinish = false
                    }
                    if($scope.user){
                    $scope.user.steps = $scope.history;
                    $http({
                          method : 'POST',
                          url    : 'http://104.236.155.62:3000/api/user/'+$scope.user._id,
                          data   : $scope.user

                        })
                      }
                    // you would want to update the user in the DB with this step value


                    // $scope.$apply(function(){
                    //   $scope.history = historyData
                    //
                    // })
                    // success(historyData);
                }
                // failure
            , function(err){alert(err)});
          }

          var needFinish = true;
          setInterval(getSteps, 5000)
          getSteps()

      }, false)
// LOG OUT FUNCTION
      $scope.logout= function(){
      if (confirm('Are you sure you want to GIVE UP and let your group DOWN?!!!')) {
        $scope.user=null;
        localStorage.removeItem('user')
        $state.go('login')
    return true;
} else {
    return false;
}

      }
      $scope.sendMsg = function(number, message){
        sms.hasPermission(function(permission){
          if(permission){
            sms.send(number, message)
          }
          // else{
          //   alert('no permissions')
          // }
        }, function(){
          alert('Permissions failed!')
        })
      }
//Poke function
      $scope.poke=function(person){
        $cordovaVibration.vibrate(500);
        // alert($scope.user.username+" "+ "Poked"+" " + person.username)
        $scope.sendMsg(person.phonenumber, 'You got poked by '+ $scope.user.username)

      }
//Nudge function
      $scope.nudge=function(person){
        $cordovaVibration.vibrate(500);
        // alert($scope.user.username+" "+ "Nudged"+" " + person.username)
        $scope.sendMsg(person.phonenumber, 'You got Nudged by '+ $scope.user.username)
      }
//Kick function
      $scope.kick=function(person){
        $cordovaVibration.vibrate(500);
        // alert($scope.user.username+" "+ "Kicked"+" " + person.username)
        $scope.sendMsg(person.phonenumber, 'You got Kicked by '+ $scope.user.username)
      }


$scope.date=new Date().toLocaleDateString()
})




.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
