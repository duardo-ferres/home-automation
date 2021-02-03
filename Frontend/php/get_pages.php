<?php
if(isset( $_POST["page"]))
{
	$page = $_POST["page"];
		
	$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

//	echo $actual_link;

	if(isset($_POST["address"]))
	{
		$address = $_POST["address"];
		$page_url = "./subpages/".$address."/".$page.".html";
		//$page_url = "/subpages/".$address."/".$page.".html";
		
	}
	
	else
	{
		$page_url = "./subpages/".$page.".html";
		
	}
	
	$page_url = str_replace("php/get_pages.php",$page_url, $actual_link);
	
	$page_body = file_get_contents($page_url);
	
	$page_body = str_replace("../","",$page_body);	
	$page_body = str_replace('<script src="jquery/jquery-2.1.4.min.js"></script>',
	'<script src="jquery/jquery-2.1.4.min.js"></script>
	<script src="script/actual-values.js"></script>
	<script src="script/main/index.js"></script>
	<script src="script/ui-integration.js"></script>',
	$page_body);
	
	
	echo $page_body;
}
?>
