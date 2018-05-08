angular.module('pomodoro', [])
      .controller('pomoController', function($scope, $interval){
      
      $scope.id = undefined;
      $scope.phase = "session";
      $scope.paused = false;
  
      $scope.break = 1; 
      $scope.session = 1; 
      $scope.time = $scope.session + ":00";
      $scope.timeleft = $scope.session*60;
  
      var updateTime = function(){      
          
        if($scope.paused)
            return;
          
          if($scope.timeleft == 0){
             $interval.cancel($scope.id);
             
             if($scope.phase == 'session'){
                alert("Pomo over! Enjoy your break");
                $scope.phase = 'break';
                $scope.start();
             }
             else if($scope.phase == 'break'){
                alert("Break over! Get back to work");
                $scope.phase = 'session';
                $scope.start();
             }
          }
          else{
             $scope.timeleft--;
             var mins = Math.floor(($scope.timeleft/60));
             var seconds = $scope.timeleft % 60;
             if(seconds < 10)
               seconds = "0" + seconds.toString();             
             $scope.time =  mins+ ":" + seconds; 
             console.log($scope.time);
          }
      }
  
      $scope.break_change = function(val){
        if($scope.phase == 'break'){
          alert("Can't change break length during break!");
          return;
        }
        if($scope.break + val >= 0)
          $scope.break += val;
      }
      
      $scope.session_change = function(val){
        if($scope.phase == 'session'){
          alert("Can't change session length during session!");
          return;
        }
        if($scope.session + val > 0){
          $scope.session += val;
          $scope.time = $scope.session + ":00";
        }
          
        
      }
 
      $scope.start = function(){
        
        // if paused, restart
        if($scope.paused){
          $scope.paused = false; 
          return;
        }
        
        // if not paused, check which phase and start that timer
        if($scope.phase == 'session')
          $scope.timeleft = $scope.session*60;
        else if($scope.phase == 'break')
          $scope.timeleft = $scope.break*60;
        else{
          $scope.phase = 'session';        
          $scope.timeleft = $scope.session*60;
        }
          
        
        alert($scope.phase + " started");
        $scope.id = $interval(updateTime, 1000);
      }
      
      $scope.pause = function(){
        if($scope.paused)
          $scope.paused = false;
        else
          $scope.paused = true;
      }
      
      $scope.stop = function(){
        $scope.time = $scope.session + ":00";
        $interval.cancel($scope.id);
        $scope.id = undefined;
        $scope.phase = undefined;
      }
});