$(document).ready(function(){
  
    var WINNING_LENGTH = 20;
    var sequence = [];
    var user_sequence_count = 0; 
    var strict = false;
  
    var playAudio = function(id){
        var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
        var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
        var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
        var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
        eval("audio"+id).play();
    }
    
    var startNewGame = function(){
        sequence = [];
        user_sequence_count = 0;
        addOne();
    }
    
    var addOne = function(){
        
      if(sequence.length < WINNING_LENGTH){
          //add a random number between 1-4
          sequence.push(Math.floor(1 + Math.random()*4));
    
          // play the sequence
          playSequence();
      }
      else
        $('.count').text('Winner!');
    }
    
    var playSequence = function(){
      
      sequence.map(function(id, index){
        
        var glow = function(){
           $('#'+id).addClass('glow'); 
           playAudio(id);
        }
        var removeGlow = function(){
           $('#'+id).removeClass('glow'); 
        }
        
        setTimeout(glow, parseInt(500*(index+1)));
        setTimeout(removeGlow, parseInt(500*(index+2)));

      });
      user_sequence_count = 0;
      updateCount();
    }
  
    var updateCount = function(){
      $('.count').text(sequence.length);
    }
  
    $('#start').click(function(){
         startNewGame();
    })
    
    $('#strict').click(function(){

        if(strict){
            strict = false;
            $('#strict').css("background-color", "#DDD");
        }
        else{
           strict = true;
           $('#strict').css("background-color", "#555");
        }
    })
    
    $('.quad').click(function(evt){
      
        var glow = function(){
           $(evt.target).addClass('glow'); 
           playAudio(evt.target.id);
        }
        var removeGlow = function(){
           $(evt.target).removeClass('glow'); 
        }
        glow();
        setTimeout(removeGlow, parseInt(500));

      
         if(sequence.length == 0)
          return; 
         else{
          // check if user pressed correct
          if(sequence[user_sequence_count] == evt.target.id){
            // user pressed correct
            user_sequence_count++;
            if(sequence.length == user_sequence_count){
                setTimeout(addOne, 500);
            }
          }
          else{
            $('.count').text('Try Again!');
            if(strict){
                // create new series of same length
                sequence = sequence.map(function(){
                    return (Math.floor(1 + Math.random()*4));
                });
            }
            setTimeout(playSequence, 500);
          }
        }
    })
})