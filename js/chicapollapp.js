
$(function()
{	

	var dataModelsApi;

	getDataModels();

	function aggDivClass(div, typeCell)
	{

		switch(typeCell)
		{
			case 1:
			return 'ui-block-a';    				
			break;
			case 2:
			return 'ui-block-b';    				
			break;
			case 3:
			return 'ui-block-c';    				
			break;
		}

	}

	function getDataModels()
	{

		var apiUrl = "https://1-dot-logical-light-488.appspot.com/_ah/api/modelendpoint/v1/getAllModelsActive"; 

		$.ajax({ 
		 url: apiUrl, 
		 dataType: 'jsonp', 
		 contentType: 'application/json', 
		 type: "GET", 
		 success: function(data) { 
		   console.log(data);
		   dataModelsApi = data;
		   gridGenerate(data);	   
		 }, 
		 error: function(xhr, ajaxOptions, thrownError) { 		   
		   console.log("Error: "+ + xhr.status);
		 }   
		});

	}



	function gridGenerate(dataModels)
	{

		var typeCell = 1;
		var idModel = 0;
		var lastDiv;
		var link;
		var img;
		var pathImgCloud = "http://pollapp.storage.googleapis.com/";

		$.each(dataModels.models, function(i, val) 
		{		

			idModel++;

			lastDiv = $('#modelsGrid').append('<div></div>').children('div').last();            

			lastDiv.attr({
				id: "model" + idModel,
				class: aggDivClass(lastDiv, typeCell)
			});                    

			link = lastDiv.append('<a></a>').children('a');

			link.attr({
				href: 'javascript:void(0)'
			});			

			link.click(clickModel);

			img = link.append("<img class='modelPhoto'></img>").children('img');							

			var picture = getMainPicture(val.picturesModel);

			img.attr({
				src: pathImgCloud + picture,
				id: val.id
			});            

			if (typeCell == 3) 
			{
				typeCell = 1
			}
			else
			{
				typeCell++;
			}     

		});
	}

	function clickModel(ev)
	{
		ev.preventDefault();		
		var keyStorage = "selectedModel";		

		if(sessionStorage.getItem(keyStorage) != null)
		{

			var tmp = JSON.parse(sessionStorage.getItem(keyStorage));
			console.log(tmp.id);

		}

		if(typeof(Storage) != "undefined")
  		{  			
  			sessionStorage.setItem(keyStorage, 
  				JSON.stringify(dataModelsApi.models[ev.target.id - 1]));
  		}
		else
  		{
  			alert("No soporta storage");
  		}

  		window.location.href = "votachicapollapp.html";
	}

	function getMainPicture(arrPictures)
	{
		var picture = null;

		$.each(arrPictures, function(index, val) {
			 
			if (val.main == true) 
			{								
				picture = val.picture;
			};

		});

		return picture;
	}	

});