var defaultUserName = 'pollappMobile';
var keyIsLogIn = 'isLogIn';
var weekdays = new Array("Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo");
var months = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre", "Diciembre");

//Urls produccion
var Servicios = {
	addPolla: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/addPolla',	
	addGuestPolla: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/addGuestPolla',
	getAllGuestUsers: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/getAllGuestUsers',
	removeGuestUser:'https://prd-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/removeGuestUser',
	updateAcceptedInvitation: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/updateAcceptedInvitation',
	getGuestByUser: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/getGuestByUser',
	getPollasByUser: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/getPollasByUser',
	getMatchsByRound: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/matchendpoint/v1/getMatchsByRound',
	getResultsMatch: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/matchendpoint/v1/getResultsMatch',
	setResultMatchByUser: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/matchendpoint/v1/setResultMatchByUser',
	getRanking: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/rankingendpoint/v1/getRanking',
	getRankingByUser: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/rankingendpoint/v1/getRankingByUser',
	voteByModel: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/modelendpoint/v1/voteByModel',
	getURLImages: 'http://pollappus.storage.googleapis.com/',
	getAllModels: 'https://prd-dot-pollappusinturik.appspot.com//_ah/api/modelendpoint/v1/getAllModelsActivePagination',
	getAllTweetsPagination: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/socialnetworkendpoint/v1/getAllTweetsPagination2',
	GetUserByEmailByPass: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/userendpoint/v1/getUserByEmailByPass',
	CreateUser: 'https://prd-dot-pollappusinturik.appspot.com/_ah/api/userendpoint/v1/createUser'
};



//URLS Finales
/*var Servicios = {
	addPolla: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/addPolla',	
	addGuestPolla: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/addGuestPolla',
	getAllGuestUsers: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/getAllGuestUsers',
	removeGuestUser:'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/removeGuestUser',
	updateAcceptedInvitation: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/updateAcceptedInvitation',
	getGuestByUser: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/getGuestByUser',
	getPollasByUser: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/getPollasByUser',
	getMatchsByRound: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/matchendpoint/v1/getMatchsByRound',
	getResultsMatch: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/matchendpoint/v1/getResultsMatch',
	setResultMatchByUser: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/matchendpoint/v1/setResultMatchByUser',
	getRanking: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/rankingendpoint/v1/getRanking',
	getRankingByUser: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/rankingendpoint/v1/getRankingByUser',
	voteByModel: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/modelendpoint/v1/voteByModel',
	getURLImages: 'http://pollappus.storage.googleapis.com/',
	getAllModels: 'https://dev-dot-pollappusinturik.appspot.com//_ah/api/modelendpoint/v1/getAllModelsActivePagination',
	getAllTweetsPagination: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/socialnetworkendpoint/v1/getAllTweetsPagination2',
	GetUserByEmailByPass: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/userendpoint/v1/getUserByEmailByPass',
	CreateUser: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/userendpoint/v1/createUser'
};*/


function getIdUser() {
	var userDTO = getSessionValue('userLoginModel');

	if(userDTO !== null) {		
		userDTO = JSON.parse(userDTO);
	}

	if(userDTO !== undefined && userDTO !== null) {		
		return userDTO.id;
	}
}

//Save a setting on the device.
function saveSessionValue(key, value){
	if(typeof(Storage) !== 'undefined') {
		localStorage.setItem(key, value);
    	//window.localStorage.setItem(key, value);
    }
}

function getSessionValue(key){
	if(typeof(Storage) !== 'undefined') {	
		//TODO QUITAR EL COMENTARIO DE ESTE BLOQUE PARA CASOS DE PRUEBA CON USUARIOS PREDEFINIDOS
		/*if(key === 'userLoginModel') {
			console.log("Usuario dummy");
			return JSON.stringify({
				id: 10,
				name: 'juan',
				lastName: 'Gomez Torres',
				email: 'juan.gomez01@gmail.com'
			});
		} else {		
			console.log("Usuario del storage");
			//return sessionStorage.getItem(key);
			return localStorage.getItem(key);
		}*/

		return localStorage.getItem(key);
	}
}

function getIdTransaccion() {
	return Math.random().toString(36).substring(10);
}

function formatDate(strDate) {
	if(strDate !== null && strDate !== undefined) {
		var arrDate = strDate.split('T');
		return arrDate[0];
	}

	return strDate;
}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}

function onAjaxLoad() {
	$('.ajax-load').css('display', 'block');
}

function onAjaxComplete() {
	$('.ajax-load').css('display', 'none');
}

function isLogIn(){
	return localStorage.getItem(keyIsLogIn);
}



