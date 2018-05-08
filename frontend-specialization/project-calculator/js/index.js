var app = angular.module('calculator', []);

app.controller('calc', function($scope){
  
  $scope.off = true;

  $scope.keys = ['AC', 'CE', '%', 'DEL', 7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', '0', '.', '=', '+' ]
  $scope.last_operation = "Off";
  $scope.current_operation = "";

  $scope.clicked = function(key){
      
      if($scope.off == true && key != 'AC')
        return; 
    
      switch (key){
        case 'DEL':
          if(typeof($scope.current_operation) == 'number' || $scope.current_operation==='Error'){
            $scope.current_operation = "0";
            $scope.last_operation = "0";
          }
          else  
            $scope.current_operation = $scope.current_operation.substr(0, $scope.current_operation.length-1);
          break;
        case 'CE':
          $scope.current_operation= "0";
          $scope.last_operation= "0";
          break;
        case 'AC':
            if($scope.off == true){
               $scope.last_operation = 0;
               $scope.current_operation = 0;
               $scope.off = false;
            }
            else{
              $scope.off = true;
              $scope.last_operation = "Off";
              $scope.current_operation = "";
            }
            break;
        case '=':
          var result = eval($scope.current_operation);
          if(typeof(result) == 'number'){
            $scope.last_operation = $scope.current_operation;
            $scope.current_operation = result;           
          }
          else{
            alert("error")
            $scope.last_operation = "0";
            $scope.current_operation = "Error";
          }
          break;
        case '.':
          if($scope.current_operation.indexOf('.') != -1)
            break;
          else
            $scope.current_operation += key;
            break;
        default:
          if(typeof($scope.current_operation) == 'number')
            $scope.current_operation = key.toString();
          else
            $scope.current_operation += key;
        }

  }
  
});