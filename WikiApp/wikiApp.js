//function to get the data from Wikipedia's API
	//strategy here is to append the HTML header with a new reference to the API for an article
function getArticle(){
	URL = "http://en.wikipedia.org/w/api.php?action=query&&prop=extracts&&format=json&callback=displayArticle";

	URL=URL+'&generator=random&grnnamespace=0'
	$('head').append('<script src='+URL+'></script>'); 
}

//once data is received from wikimedia, parse it for the extract/title, and then append it to the view
function displayArticle(data){
	$('#textarea').empty(); 
	jsonResponse = data.query.pages; 
	$.each(jsonResponse, function(key, element) {
		extract=jsonResponse[key].extract
		title = jsonResponse[key].title
	});
	firstParagraph = extract.substring(extract.indexOf('<p>'), extract.indexOf('</p>')); 
	if(firstParagraph.length === 0){
		getArticle(); 
	}
	$('#textarea').append(firstParagraph); 
	// console.log(extract); 
}


$(document).ready(function(){
	//first time loading the page: 
	getArticle(); 
	
	//attach event to the button (div) for getting a new article without refreshing
	$('#newArticle').click(function() {
		getArticle();
	});
	
	//attach event for opening the entire article
	$('#openArticle').click(function() {
		var win=window.open("http://en.wikipedia.org/wiki/"+title, '_blank');
			win.focus();
	});
	
});

