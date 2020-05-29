<?php

require_once "../global.php";

$con = mysqli_connect($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if (mysqli_connect_errno()) {
    response_message(500,"Error: ");
}
//add into student table
$sql = "INSERT INTO `".$dbname."`.`student`(`SID`, `Sname`, `Sdepartment`) VALUES ('".$_REQUEST["SID"]."','".$_REQUEST["Sname"]."','".$_REQUEST["Sdepartment"]."')";
$result = mysqli_query($con,$sql);

//add into study table 
$sql2 = "INSERT INTO `".$dbname."`.`study`(`SID`, `SBID`) VALUES ('".$_REQUEST["SID"]."','".$_REQUEST["SBID"]."')";
$result2 = mysqli_query($con,$sql2);

if(!($result2))
{
    response_message(500,"Unsuccess");
}
else
{
    response_message(200,"Success");
}

mysqli_free_result($result);
mysqli_free_result($result2);
mysqli_close($con);

?>