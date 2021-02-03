$(document).ready(function(e) {	

	nav_type = navigator.userAgent.toLowerCase();
	var selectedBG = "#f00";
	var selector = "";
	var unselectedBG = "#f00";
	
	if(nav_type.indexOf("safari") > -1)
	{
		selector = "background";
		unselectedBG = "-webkit-linear-gradient(top,  rgba(255,255,255,0.3) 0%,rgba(255,255,255,0.1) 100%)";
		selectedBG = "-webkit-linear-gradient(top,  rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.1) 100%)";
	}
	else if(indexOf("mozila") > -1)
	{
		unselectedBG = "-moz-linear-gradient(top,  rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)";
		selectedBG = "-moz-linear-gradient(top,  rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)";
		selector = "background";
	}
	else
	{
		unselectedBG = "progid:DXImageTransform.Microsoft.gradient( startColorstr='#4dffffff', endColorstr='#1affffff',GradientType=0 )";
		selectedBG = "progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#00ffffff',GradientType=0 )";
		selector = "filter";
	}
	
	$(".numeric").click(function(){
		$(".teclado-numerico").show();
		$(".teclado-direcional").hide();
		$(".teclado-favoritos").hide();
		
		/*muda estilo do background*/
		
		$(".numeric").css(selector,selectedBG);
		$(".numeric").css("border-bottom","none");		
		$(".direcional").css(selector,unselectedBG);
		$(".direcional").css("border-bottom","thick inset rgba(200,200,200,0.1)");
		$(".favourits").css(selector,unselectedBG);
		$(".favourits").css("border-bottom","thick inset rgba(255,255,255,0.1)");
		
	});
	$(".direcional").click(function(){
		$(".teclado-numerico").hide();
		$(".teclado-direcional").show();
		$(".teclado-favoritos").hide();
		
		/*muda estilo do background*/
		
		$(".numeric").css(selector,unselectedBG);
		$(".numeric").css("border-bottom","thick inset rgba(255,255,255,0.1)");		
		$(".direcional").css(selector,selectedBG);
		$(".direcional").css("border-bottom","none");
		$(".favourits").css(selector,unselectedBG);
		$(".favourits").css("border-bottom","thick inset rgba(255,255,255,0.1)");
	});
	$(".favourits").click(function(){
		$(".teclado-numerico").hide();
		$(".teclado-direcional").hide();
		$(".teclado-favoritos").show();
		
		/*muda estilo do background*/
		
		$(".numeric").css(selector,unselectedBG);
		$(".numeric").css("border-bottom","thick inset rgba(255,255,255,0.1)");		
		$(".direcional").css(selector,unselectedBG);
		$(".direcional").css("border-bottom","thick inset rgba(255,255,255,0.1)");
		$(".favourits").css(selector,selectedBG);
		$(".favourits").css("border-bottom","none");
	});
	
	//inicia na aba de navegação
	$(".direcional").click();
});