$(document).ready(function(e){

    var tweetQuote = "";
  
    var refreshQuote = function(){
          $.ajax({
              url:"https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
              type:"POST",
              beforeSend: function(xhr){
                        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                        xhr.setRequestHeader("Accept","application/json");
                        xhr.setRequestHeader("X-Mashape-Key", "0m1KJ0U3YOmshWr8vHWZdAnF11kSp1U2HcAjsnKWf1rjcXaDQK");
                          },
              dataType:"json",
              success: function(data){
                  
                  if($('body').css('visibility') == 'hidden')
                    $('body').css('visibility', 'visible')
                  
                  $('blockquote p').text(data.quote);
                  $('blockquote .author').text(data.author);
                
                  var tweet = "Tweeting a quote by " +  data.author + " - " + data.quote;
                  tweet = tweet.replace(/ /g,"%20");;
                  tweetQuote = "https://twitter.com/intent/tweet?text=" + tweet;
                }      
            })      
    }
   
    refreshQuote();
  
    $('.refresh').on("click", function(e){
        refreshQuote();
    })
    
    $('.twitter').on("click", function(e){
        window.open(tweetQuote);
    })
    

})