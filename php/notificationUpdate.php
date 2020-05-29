<?php
    require_once "global.php";
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    mysqli_set_charset($connect, "utf8");
    if (mysqli_connect_errno()) {
        response_message(500,"Error: ");
    }

/*********** [ add noti ] ************/
    $type = $_REQUEST["notiType"];
    $sbid = $_REQUEST["SBID"];
    $owner = $_REQUEST["owner"];
    $sql = "INSERT INTO `".$dbname."`.`notification`(`SBID`, `notiType`, `owner`) VALUES ('".$sbid."','".$type."','".$owner."')";
    $result = mysqli_query($connect,$sql);
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