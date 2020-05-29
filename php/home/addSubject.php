<?php

require_once "../global.php";

$con = mysqli_connect($servername, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    response_message(500,"Error: ");
}


$sql = "INSERT INTO `".$dbname."`.`subject`(`SBID`, `SBname`, `SBdes`) VALUES ('CS124','test name','test description')";
// $sql = "INSERT INTO `subject`(`SBID`, `SBname`, `SBdes`) VALUES ('CS124','test name','test description')";
$result = mysqli_query($con,$sql);

// $sql2 = "INSERT INTO `".$dbname."`.`sub_t` ( `TID`, `SBID`) VALUES ('".$_REQUEST["TID"]."','".$_REQUEST["SBID"]."')";
// $result2 = mysqli_query($con,$sql);

if(!($result))
{
    response_message(500,"Unsuccess: result is not added");
}
else
{
    response_message(200,"Success");
}

mysqli_free_result($result);
// mysqli_free_result($result2);
mysqli_close($con);

?>