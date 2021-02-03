$(document).ready(function(e) {
	
	$("#leftSideBar").mouseenter(function(){
			//arrasta botao de toggle
			$("#leftSideBar .AmbientTable").show();
	});
	$("#leftSideBar").mouseleave(function(){
			//arrasta botao de toggle
			$("#leftSideBar .AmbientTable").hide();
	});
	
});