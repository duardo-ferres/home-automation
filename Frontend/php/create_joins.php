<?php
ECHO "COMENTADO POR SEGURANÇA - CASO EXECUTAR TIRE O COMENT TAG *// ";
/*
include "conection.php";

$con = mysqli_connect($dataBaseSERVER,$dataBaseUSR,$dataBasePWD,$dataBaseNAME);

// Check connexao
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


$triger_suite_2 = "";
$triger_suite_3 = "";
$triger_lazer = "";
$triger_cozinha = "";

$query_array = array();

$query = "SELECT `PRIMARYID`, `TAGLIST`, `DESCRICAO` FROM `comandos` WHERE `TAGLIST` LIKE 'SUITE_2%'";
$queryResult = mysqli_query($con,$query);

while(($row = mysqli_fetch_assoc($queryResult)) != false)
{
	array_push($query_array,"INSERT INTO `gatilhos`(`ID`, `PRIMARYID`, `COMANDO`, `EQUIPAMENTO`, `DESCRICAO`, `TAGLIST`, `ATIVO`)
 VALUES (null,'TRIGER_".$row["PRIMARYID"]."','".$row["PRIMARYID"]."','GLOBAL_CACHE_SUITE_2','".$row["DESCRICAO"]."','".$row["TAGLIST"]."','1')");
}

$query = "SELECT `PRIMARYID`, `TAGLIST`, `DESCRICAO` FROM `comandos` WHERE `TAGLIST` LIKE 'SUITE_3%'";
$queryResult = mysqli_query($con,$query);

while(($row = mysqli_fetch_assoc($queryResult)) != false)
{
	array_push($query_array, "INSERT INTO `gatilhos`(`ID`, `PRIMARYID`, `COMANDO`, `EQUIPAMENTO`, `DESCRICAO`, `TAGLIST`, `ATIVO`)
 VALUES (null,'TRIGER_".$row["PRIMARYID"]."','".$row["PRIMARYID"]."','GLOBAL_CACHE_SUITE_3','".$row["DESCRICAO"]."','".$row["TAGLIST"]."','1')");
}

$query = "SELECT `PRIMARYID`, `TAGLIST`, `DESCRICAO` FROM `comandos` WHERE `TAGLIST` LIKE 'LAZER%' OR `TAGLIST` LIKE 'COZINHA%' OR `TAGLIST` LIKE 'JANTAR%'";
$queryResult = mysqli_query($con,$query);

while(($row = mysqli_fetch_assoc($queryResult)) != false)
{
	array_push($query_array,"INSERT INTO `gatilhos`(`ID`, `PRIMARYID`, `COMANDO`, `EQUIPAMENTO`, `DESCRICAO`, `TAGLIST`, `ATIVO`)
 VALUES (null,'TRIGER_".$row["PRIMARYID"]."','".$row["PRIMARYID"]."','	GLOBAL_CACHE_DISPENSA','".$row["DESCRICAO"]."','".$row["TAGLIST"]."','1')");
}

for($i=0;$i<sizeof($query_array);$i++)
{
	$query = $query_array[$i];
	$queryResult = mysqli_query($con,$query);
	if($queryResult)
	{
		//echo "ok - ".$query_array[$i];
	}
	else
	{
		echo "".$query_array[$i];
		echo "<br>";
	}
}

mysqli_close($con);*/

//pARTE DEDICADA A DIMMERS //
/*
include "conection.php";

$con = mysqli_connect($dataBaseSERVER,$dataBaseUSR,$dataBasePWD,$dataBaseNAME);

// Check connexao
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


$triger_suite_2 = "";
$triger_suite_3 = "";
$triger_lazer = "";
$triger_cozinha = "";

$query_array = array();

$query = "SELECT `PRIMARYID`, `TAGLIST`, `DESCRICAO` FROM `comandos` WHERE `TAGLIST` LIKE 'DIMER%'";
$queryResult = mysqli_query($con,$query);

while(($row = mysqli_fetch_assoc($queryResult)) != false)
{
	array_push($query_array,"INSERT INTO `gatilhos`(`ID`, `PRIMARYID`, `COMANDO`, `EQUIPAMENTO`, `DESCRICAO`, `TAGLIST`, `ATIVO`)
 VALUES (null,'TRIGER_".$row["PRIMARYID"]."','".$row["PRIMARYID"]."','NEOCDIMMER','".$row["DESCRICAO"]."','".$row["TAGLIST"]."','1')");
}

for($i=0;$i<sizeof($query_array);$i++)
{
	$query = $query_array[$i];
	$queryResult = mysqli_query($con,$query);
	if($queryResult)
	{
		//echo "ok - ".$query_array[$i];
	}
	else
	{
		echo "".$query_array[$i];
		echo "<br>";
	}
}

mysqli_close($con);
*/

/*parte dedicada a relays */
/*
include "conection.php";

$con = mysqli_connect($dataBaseSERVER,$dataBaseUSR,$dataBasePWD,$dataBaseNAME);

// Check connexao
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


$triger_suite_2 = "";
$triger_suite_3 = "";
$triger_lazer = "";
$triger_cozinha = "";

$query_array = array();

$query = "SELECT `PRIMARYID`, `TAGLIST`, `DESCRICAO` FROM `comandos` WHERE `TAGLIST` LIKE 'RELAY%'";
$queryResult = mysqli_query($con,$query);

while(($row = mysqli_fetch_assoc($queryResult)) != false)
{
	array_push($query_array,"INSERT INTO `gatilhos`(`ID`, `PRIMARYID`, `COMANDO`, `EQUIPAMENTO`, `DESCRICAO`, `TAGLIST`, `ATIVO`)
 VALUES (null,'TRIGER_".$row["PRIMARYID"]."','".$row["PRIMARYID"]."','BECKHOFF','".$row["DESCRICAO"]."','".$row["TAGLIST"]."','1')");
}

for($i=0;$i<sizeof($query_array);$i++)
{
	$query = $query_array[$i];
	$queryResult = mysqli_query($con,$query);
	if($queryResult)
	{
		//echo "ok - ".$query_array[$i];
	}
	else
	{
		echo "".$query_array[$i];
		echo "<br>";
	}
	
}

mysqli_close($con);
*/
/*
include "conection.php";

$con = mysqli_connect($dataBaseSERVER,$dataBaseUSR,$dataBasePWD,$dataBaseNAME);

// Check connexao
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


$triger_suite_2 = "";
$triger_suite_3 = "";
$triger_lazer = "";
$triger_cozinha = "";

$query_array = array();

$query = "SELECT `ID`, `PRIMARYID`, `COMANDO`, `EQUIPAMENTO`, `DESCRICAO`, `TAGLIST`, `ATIVO` FROM `gatilhos` WHERE `COMANDO` NOT LIKE '%DIMER%'";
$queryResult = mysqli_query($con,$query);

$id = 0;

while(($row = mysqli_fetch_assoc($queryResult)) != false)
{
	array_push($query_array,"UPDATE `join_digital` SET `PRIMARYID`='".str_replace("TRIGER","JOIN",$row["PRIMARYID"])."',`TAGLIST`='".$row["TAGLIST"]."',`SCRIPT`='CALLTRIGERBYNAME(".$row["PRIMARYID"].")',`STATE`=1,`DESCRICAO`='CHAMA ".$row["PRIMARYID"]."' WHERE `JOIN`='".$id."'");

	$id += 1;
}

for($i=0;$i<sizeof($query_array);$i++)
{
	
	$query = $query_array[$i];
	$queryResult = mysqli_query($con,$query);
	if($queryResult)
	{
		//echo "ok - ".$query_array[$i];
	}
	else
	{
		echo "".$query_array[$i];
		echo "<br>";
	}
}
*/
?>