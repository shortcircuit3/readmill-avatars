$(function() {
  // The initial request URL

  function getAvatars(user) {
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
              var avatarURL = "https://api.readmill.com/v2/users/" + userID + "/avatar?size=large&client_id=47c04f7eb4a2f8710a1a8fdf61244c37";
              $(".avatars").append('<li><img id="'+ userID +'" src="'+ avatarURL +'"/><p>' + userID + '</p></li>');
            }
          }
      });
    }
    loadAvatars(reqURL);
  }

  getAvatars(5702);

  $('body').on('click', 'img', function(){
    var newUserID = this.id;
    $(".avatars").empty();
    getAvatars(newUserID);
  });
});
