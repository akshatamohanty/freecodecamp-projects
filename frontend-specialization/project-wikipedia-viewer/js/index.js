var search = function(){

  // api request
  var loadLinkCards = function(title, body, href) {
      var newdiv = document.createElement("DIV");
      
      $(newdiv).addClass('link-card');
      $(newdiv).html(
        '<h3>' + title + '</h3><hr>' + 
        '<p>' + body + '</p>'
      );
      
      $(newdiv).click(function(){
        window.open(href, '_blank');
      })
      
      document.getElementById('link-container').appendChild(newdiv);
  }
  
  var search_term = 'Lorem Ipsum';
  var api_url = "https://en.wikipedia.org/w/api.php";

  // Invalid preflight solution from - http://stackoverflow.com/questions/35545525/wikipedia-api-preflight-is-invalid
  $.ajax({url: api_url,
          dataType: 'jsonp',
          jsonp: 'callback',
          data: {action: 'opensearch',
                 search: document.getElementById('search-item').value || search_term,
                 limit: 5,
                 format: 'json'},
          success: function(response) {

            // Now you have search results!
            //console.log(response);
            $('#link-container').empty();
            for(var i=0; i< response[1].length; i++){
              loadLinkCards(response[1][i], response[2][i], response[3][i]);
            }

          }
  });

}