$(function() {
  // The initial request URL

  function getAvatars(user) {

    // Empty existing avatars from container
    $(".avatars").empty();

    // Request URL
    var reqURL = "https://api.readmill.com/v2/users/"+ user +"/followings?client_id=47c04f7eb4a2f8710a1a8fdf61244c37";

    // Retreives photos from Instagram
    function loadAvatars(reqURL) {

      $.ajax({
          type: "GET",
          dataType: "jsonp",
          cache: false,
          url: reqURL,
          success: function(data) {
            console.log(data);

            // Get the amount of photos in the object
            var count = data.items.length;

            for (var i = 0; i < count; i++) {
              var userID = data.items[i].user.id;
              var firstname = data.items[i].user.firstname || '*';
              var lastname = data.items[i].user.lastname || '*';
              var currentlyReading = data.items[i].user.books_reading_count;
              var finishedBooks = data.items[i].user.books_finished_count;
              var totalBooks = currentlyReading + finishedBooks;

              var avatarURL = "https://api.readmill.com/v2/users/" + userID + "/avatar?size=large&client_id=47c04f7eb4a2f8710a1a8fdf61244c37";
              $(".avatars").append(
                '<li>' +
                  '<a href="#_"><img id="'+ userID +'" src="'+ avatarURL +'"/></a>' +
                  '<p class="name">' +  firstname + ' ' + lastname + '</p>' +
                  '<p>' + totalBooks + ' books</p>'+
                '</li>'
              );
            }
          }
      });
    }
    loadAvatars(reqURL);
  }

  function refreshAvatars() {
    var randomUserID = Math.floor(Math.random() * 10000);
    console.log(randomUserID);
    getAvatars(randomUserID);
  }

  // View 'this' the avatars that this user is following
  $('body').on('click', 'img', function(){
    var newUserID = this.id;
    getAvatars(newUserID);
  });

  // Refresh view
  $('body').on('click', '.refresh', function(){
    refreshAvatars();
  });

  // Initialize view
  getAvatars(5702);

});
