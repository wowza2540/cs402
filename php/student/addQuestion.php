<?php
    require_once "../global.php";
    $connect = mysqli_connect($servername,$username,$password,$dbname);
    mysqli_set_charset($connect, "utf8");
    if (mysqli_connect_errno()) {
        response_message(500,"Error: ");
    }

    $detail = $_REQUEST["Qdetail"];
    $id = $_REQUEST["post_byID"];
    $name = $_REQUEST["post_byName"];
    $lid = $_REQUEST["LID"];
    $sql = "INSERT INTO `".$dbname."`.`question`(`Qdetail`, `post_byID`, `post_byName`,`LID`) VALUES ('".$detail."','".$id."','".$name."','".$lid."')";
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
mysqli_close($connect);

?>