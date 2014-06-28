
$(function()
{		

	var maxIdGlobal = 0;
	var countTweeets = 10;

	$('#linkLoadMore').click(loadMore);

	$(".posts").scroll( function() {
  		if($(this)[0].scrollHeight - $(this).scrollTop() == $(this).outerHeight()) {   			
   			loadMore();
  	}
	});

	getDataTweets(countTweeets, 0);

	function getDataTweets(count, maxId)
	{		

		var apiUrl = Servicios.getAllTweetsPagination;
		var idTransaccion = getIdTransaccion();

		$.ajax({ 
			url: apiUrl, 
			dataType: 'jsonp', 
			contentType: 'application/json', 
			type: "GET",
			data: {
				application: 'mobilePollapp',
				idTransaction: idTransaccion,
				pageNumber: 0,
				pageSize: 0,
				user: defaultUserName,
				count: count,
				maxId: maxId
			},
			success: function(data) {		   
				loadTweets(data);
				onAjaxComplete();
			}, 
			error: function(xhr, ajaxOptions, thrownError) { 		   
				alert("Error: "+ + xhr.status);
			},
			beforeSend: function( xhr ) {
				onAjaxLoad();
			},
			complete: function(xhr, textStatus ) {
				if(textStatus !== 'success') {
					onAjaxComplete();
				}
			}  
		});

	}

	function loadTweets(data)
	{					
		if (data.tweets.length > 0) 
		{

			$.each(data.tweets, function(index, tweet) {

				if (--maxIdGlobal != tweet.id)
				{

					post = getTemplate(tweet.name, tweet.screenName, tweet.text, tweet.profileImageURL, tweet.createdAt);			

					maxIdGlobal = tweet.id;

					$('.posts').append($(post).fadeIn(1000,function()
					{
						$(this).css('display', 'inline-block');
					}));

				}

			});		
		}

	}	

	function getTemplate(name, screenName, text, image, createdAt)
	{

		var date = parseTwitterDate(createdAt);

		text = searchURLText(text);

		var template = '<article class="post"> \
		<div class="description"> \
		<figure class="imagen"> \
		<img src="'+image+'"> \
		</figure> \
		<figure class="icon"> \
		<img src="../img/bird_blue_16.png"> \
		</figure> \
		<div class="details"> \
		<h2 class="name">'+name+'</h2> \
		<h2 class="screenName">@'+screenName+'</h2> \
		<p class="text"> \
		'+text+' \
		</p> \
		<p class="date"><strong>'+date+'</strong> </p> \
		</div> \
		</div> \
		</article>';		

		return template;
	}

	function searchURLText(textTweet){

		var index = textTweet.toLowerCase().indexOf('http');		

		if (index != -1) {
			var url = textTweet.substring(index, textTweet.length);
			var UrlHTML = "<a href='"+url+"'>"+url+'</a>';			
			textTweet = textTweet.substring(0, index) + " " + UrlHTML;
			return textTweet;
		};

		return textTweet;

	}

	function parseTwitterDate(tdate) {

		var system_date = new Date(Date.parse(tdate));
		var user_date = new Date();

		if (K.ie) {
			system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
		}

		var diff = Math.floor((user_date - system_date) / 1000);
		if (diff <= 1) {return "ahora";}
		if (diff < 20) {return "Hace "+ diff + " segundos";}
		if (diff < 40) {return "Hace medio minuto";}
		if (diff < 60) {return "Menos de un minuto";}
		if (diff <= 90) {return "Hace un minuto";}
		if (diff <= 3540) {return "Hace " + Math.round(diff / 60) + " minutos";}
		if (diff <= 5400) {return "Hace 1 Hora";}
		if (diff <= 86400) {return "Hace " + Math.round(diff / 3600) + " horas";}
		if (diff <= 129600) {return "Hace 1 dia";}
		if (diff < 604800) {return "Hace " + Math.round(diff / 86400) + " dias";}
		if (diff <= 777600) {return "Hace 1 semana";}

		return convertDate(system_date);
	}

	// from http://widgets.twimg.com/j/1/widget.js
	var K = function () {
		var a = navigator.userAgent;

		return {
			ie: a.match(/MSIE\s([^;]*)/)
		}
	}();

	function convertDate(inputFormat) {
		function pad(s) { return (s < 10) ? '0' + s : s; }
		var monthNames = [ "Ene", "Feb", "Mar", "Abr", "Mayo", "Jun",
		"Jul", "Agos", "Sep", "Oct", "Nov", "Dic" ];
		var d = new Date(inputFormat);
		return pad(d.getDate()) + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
	}

	function loadMore(){
		
		//ev.preventDefault();

		getDataTweets(countTweeets, ++maxIdGlobal);

	}

	$('.volver-btn').click(function() {
        event.preventDefault(); 
        history.back(1); 
    });


});
