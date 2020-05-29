<?php

    require_once "../global.php";
    $con = mysqli_connect($servername, $username, $password, $dbname);
    mysqli_set_charset($con, "utf8");
    if (mysqli_connect_errno()) {
        response_message(500,"Error: ");
    }
/*********** [ lesson file and les_file ] ************/
    $FID = $_REQUEST["FID"];
    $detail = $_REQUEST["QAdetail"];
    $postby = $_REQUEST["postby"];
    $sql = "INSERT INTO `".$dbname."`.`qanda`(`postby`, `QAdetail`, `FID`) VALUES ('".$postby."','".$detail."','".$FID."')";
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