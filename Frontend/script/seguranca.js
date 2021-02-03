var actualImage = "";
var lastTimeout = 0;
$(document).ready(function(e) {
	$("img").click(function(){
			//arrasta botao de toggle
			actualImage = $(this).attr("src");
			
			//atualiza sempre que pronto
			$("#current-cam").ready(function(e) {
        			refreshImage();
   			 });
	});
	
	var imageState;
	/*fullscreen*/
	$("#current-cam").click(function(){
		$("#fullScreen").toggle();		
	});
	$("#fullScreen").click(function(){
		$("#fullScreen").toggle();		
	});
	
});

function refreshImage()
{
	setTimeout(function(){
		$("#current-cam").attr("src",actualImage);
		$("#fullScreen .image").attr("src",actualImage);
/*		$("#current-cam").replaceWith("<img id='current-cam' src='"+actualImage+"' />");*/
		refreshImage();
	},50);
}