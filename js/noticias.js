
$(function()
{		

	getDataTweets();

	function getDataTweets()
	{

		var apiUrl = "https://1-dot-logical-light-488.appspot.com/_ah/api/socialnetworkendpoint/v1/getAllTweets"; 

		$.ajax({ 
		 url: apiUrl, 
		 dataType: 'jsonp', 
		 contentType: 'application/json', 
		 type: "GET", 
		 success: function(data) {		   
		   loadTweets(data);
		 }, 
		 error: function(xhr, ajaxOptions, thrownError) { 		   
		   console.log("Error: "+ + xhr.status);
		 }   
		});

	}

	function loadTweets(data)
	{		

		$.each(data.tweets, function(index, tweet) {
			
			var post = getTemplate(tweet.name, tweet.screenName, tweet.text, tweet.profileImageURL, tweet.createdAt);

			$('.posts').prepend($(post).fadeIn(function()
					{
						$(this).css('display', 'inline-block');
					}));


		});		

	}	

	function getTemplate(name, screenName, text, image, createdAt)
	{

		var template = '<article class="post"> \
					<div class="description"> \
						<figure class="imagen"> \
							<img src="'+image+'"> \
						</figure> \
						<div class="details"> \
							<h2 class="name">'+name+'</h2> \
							<h2 class="screenName">@'+screenName+'</h2> \
							<p class="text"> \
								'+text+' \
								</p> \
						</div> \
					</div> \
					</article>';

		return template;
	}

});
