<?php

    require_once "../global.php";
    $con = mysqli_connect($servername, $username, $password, $dbname);
    mysqli_set_charset($connect, "utf8");
    if (mysqli_connect_errno()) {
        response_message(500,"Error: ");
    }
/*********** [ lesson file and les_file ] ************/
    $lname = $_REQUEST["Lname"];
    $ldes = $_REQUEST["Ldes"];
    $sbid = $_REQUEST["SBID"];
    $sql = "INSERT INTO `".$dbname."`.`lesson`(`Lname`, `Ldes`, `SBID`) VALUES ('".$lname."','".$ldes."','".$sbid."')";
    $result = mysqli_query($con,$sql);
    if(!($result))
    {
        response_message(500,"Unsuccess: result is not added");
    }
    else
    {
        response_message(200,"Success");
    }

mysqli_free_result($result);
mysqli_close($con);

?>