
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

		var apiUrl = Servicios.getAllModels;
		var idTransaccion = getIdTransaccion();

		console.log(apiUrl);

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
				user: defaultUserName
		 },
		 success: function(data) {		   
		   dataModelsApi = data;
		   gridGenerate(data);

		   onAjaxComplete();
		 }, 
		 error: function(xhr, ajaxOptions, thrownError) {		   
		   alert("Error: " + xhr.status)
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

	function gridGenerate(dataModels)
	{

		var typeCell = 1;
		var idModel = 0;
		var lastDiv;
		var link;
		var img;
		var pathImgCloud = Servicios.getURLImages;

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

			if (typeCell == 2) 
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


		if(typeof(Storage) != "undefined")
  		{  	
  			var model = selectedtModel(ev.target.id);  			

  			localStorage.setItem(keyStorage, 
  				JSON.stringify(model));
  		}
		else
  		{
  			alert("No soporta localStorage");
  		}

  		window.location.href = "votachicapollapp.html";
	}

	function selectedtModel(idModel)
	{
		var model;

		$.each(dataModelsApi.models, function(index, val) {			
			 if (val.id == idModel) 
			 {			 	
			 	model = val;			 	
			 };
		});

		return model;
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

	$('.volver-btn').click(function() {
        event.preventDefault(); 
        history.back(1); 
    });

});


