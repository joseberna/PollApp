
$(function()
{	

	loadTweets();

	function loadTweets()
	{

		var encodeKey = encodeURIComponent(getTwitterConsumerTokens().key, 'RFC 1738');
		var encodeSecret = encodeURIComponent(getTwitterConsumerTokens().secret, 'RFC 1738');

		var bearerToken = encodeKey + ':' + encodeSecret;

		console.log(bearerToken);

		var bearerTokenBase64 = btoa(bearerToken);

		console.log(bearerTokenBase64);

		var urlTwitter = "https://api.twitter.com/oauth2/token";		

		$.ajax({
			url: urlTwitter,
			dataType: 'jsonp',
			type:"POST",
			beforeSend: function(request)
			{
				request.setRequestHeader("Authorization", "Basic " + bearerTokenBase64);
                request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
                request.setRequestHeader("Accept-Encoding","gzip");
			},
			
        	data: "grant_type=client_credentials",
        	processData: false,

        	success: function(msg) {
            	alert("successfull");
        	},

        	error: function(xhr, ajaxOptions, thrownError) { 		   
		   		console.log("Error: "+ xhr.status);
		 	}
		});

	}

	function getTeewts(data)
	{

		console.log(data);

	}

	function getTwitterConsumerTokens(){
		return {key: "YjbFuhig1rLvE2ZnidvQ", 
		secret: "Hz3SiNE0IRbLfKMMZRJA60yUovvaQWrX3yiwg2pnz4"};
	}

});
