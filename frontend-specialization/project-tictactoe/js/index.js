$(document).ready(function(){
  
    var winning_combinations = [ [1, 2, 3], [4, 5, 6], [7, 8, 9], 
                                 [1, 4, 7], [2, 5, 8], [3, 6, 9],
                                 [1, 5, 9], [3, 5, 7] ];
  
    var player = 'x';
    var computer = 'o';
  
    var player_cells = [];
    var computer_cells = [];
    
    var player_score = 0;
    var computer_score = 0;
  
    var turn = 'player';
  
    function setPlayerChoice(value){
      player = value;
      computer = player === 'o' ? 'x' : 'o';
    }
  
    function startPlay(){
       $('.cell').text('');   
       turn = 'player';
       player_cells = [];
       computer_cells = [];
      
        $('.message-container').addClass('hide');
        $('.cell-container').removeClass('hide'); 
        $('.score-area').removeClass('hide');
        updateScores();
    }
  
    function checkGameEnd(){
      var args = arguments[0];
      var flag = false;
      // check win
      winning_combinations.map(function( combination ){
        
          var updateWin = function(tag){
              setTimeout( function(){
                    
                   $('.cell#' + combination[0]).css({'color': 'black'});
                   $('.cell#' + combination[1]).css({'color': 'black'});
                   $('.cell#' + combination[2]).css({'color': 'black'});
                   
                  }, 200); 
              setTimeout( function(){
                   
                   // reset color
                   $('.cell').css({'color': 'white'});
                    
                   $('.message').addClass('hide');
                   $('.control').addClass('hide');
                   $('.cell-container').addClass('hide');

                   $(tag).removeClass('hide');   
                   $('.message-container').removeClass('hide');
                   if(tag == '#win')
                      player_score++;
                   else
                     computer_score++;
                   
                  }, 1000);  
              setTimeout(startPlay, 2000);             
           }

          if( computer_cells.indexOf(combination[0]) > -1 &&
               computer_cells.indexOf(combination[1]) > -1 &&
               computer_cells.indexOf(combination[2]) > -1 ){
               if(args == undefined) 
                 updateWin('#lost');
               flag = true;
           }
           else if( player_cells.indexOf(combination[0]) > -1 &&
               player_cells.indexOf(combination[1]) > -1 &&
               player_cells.indexOf(combination[2]) > -1 ){
               if(args == undefined) 
                 updateWin('#win');
               flag = true;
           }
      });
      
      //check draw
      if(flag == false && computer_cells.length + player_cells.length == 9){
          setTimeout( function(){
             $('.message').addClass('hide');
             $('.control').addClass('hide');
             $('.cell-container').addClass('hide');

             $('#draw').removeClass('hide');   
             $('.message-container').removeClass('hide');

             setTimeout(startPlay, 2000);        
          }, 1000);
          flag = true;
      }
      
      return flag;
    
    }
   
    function computerTurn(){

        var lastNum = 0;
        for(var i=1; i < 10; i++){
          if (player_cells.indexOf(i) == -1 && computer_cells.indexOf(i) == -1){
             
             computer_cells.push(i);
             player_cells.push(i);
             
             lastNum = i;
             
             if(checkGameEnd(1) == true ){
                player_cells.pop();
                computer_cells.pop();
                break;
             }

             player_cells.pop();
             computer_cells.pop();
          }
        }

        $('#' + lastNum).html(computer);
        computer_cells.push(lastNum);

          
        turn = 'player'; console.log(computer_cells, player_cells);
        checkGameEnd();
    }
   
    function updateScores(){
        $('.player.score').text('Player :' +  player_score);
        $('.computer.score').text('Computer :' +  computer_score);
    }
  
    function reset(){
      player_score = 0;
      computer_score = 0;
    }
  
    $('#reset').click(function(){
       $('.message').addClass('hide');
       $('.control').addClass('hide');
       $('.cell-container').addClass('hide');
      
       $('#start').removeClass('hide');
       $('#start-play').removeClass('hide');   
       $('.message-container').removeClass('hide');
      reset(); 
      updateScores();
    })
  
    $('#start').click(function(){
        
        $('#start').addClass('hide');
        $('#start-play').addClass('hide');
        
        $('#pick').removeClass('hide');
        $('#x').removeClass('hide');
        $('#o').removeClass('hide');
    });
  
    $('.choice').click(function(event){
        setPlayerChoice(this.id);
        
        $('#pick').addClass('hide');
        $('#x').addClass('hide');
        $('#o').addClass('hide');
        $('.message-container').addClass('hide');
      
        startPlay();
    })
    
    $('.cell').click(function(evt){
        if(turn === 'player' && computer_cells.concat(player_cells).indexOf(parseInt(evt.target.id)) == -1){
          turn = 'computer';
          $( this ).html(player);
          player_cells.push( parseInt(evt.target.id) ); 
          if(checkGameEnd() == false)
            setTimeout(computerTurn, 1000);

        }
    });
  
})