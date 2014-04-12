
$(function()
{	

	loadImages();

	function loadImages()
	{

		var list;
		var li;
		var keyStorage = "selectedModel";	
		var pathImgCloud = "http://pollapp.storage.googleapis.com/";

		list = $('.flicker-pollapp').children('ul').last();	

		if(sessionStorage.getItem(keyStorage) != null)
		{

			var dataModel = JSON.parse(sessionStorage.getItem(keyStorage));
			console.log(dataModel);	

			$.each(dataModel.picturesModel, function(i, val) 
			{
				if (val.main == false) 
				{
					li = list.append('<li></li>').children('li').last();
					var picture = val.picture;

					li.data('background', (pathImgCloud + picture));					
				}

			});
		}

	}

});