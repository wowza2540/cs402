<?php

require_once "../global.php";

$con = mysqli_connect($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if (mysqli_connect_errno()) {
    response_message(500,"Error: ");
}


$sql = "INSERT INTO `".$dbname."`.`subject`(`SBID`, `SBname`, `SBdes`) VALUES ('".$_REQUEST["SBId"]."','".$_REQUEST["SBname"]."','".$_REQUEST["SBdes"]."')";
$result = mysqli_query($con,$sql);
// mysqli_free_result($result);

$sql2 = "INSERT INTO `".$dbname."`.`sub_t` ( `SBID`, `TID`) VALUES ('".$_REQUEST["SBId"]."','".$_REQUEST["TID"]."')";
$result2 = mysqli_query($con,$sql2);

if(!($result))
{
    response_message(500,"Unsuccess: result is not added");
}
else
{
    response_message(200,"Success");
}

mysqli_free_result($result);
mysqli_free_result($result2);
mysqli_close($con);

?>