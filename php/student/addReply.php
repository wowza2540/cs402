<?php

    require_once "../global.php";
    $con = mysqli_connect($servername, $username, $password, $dbname);
    mysqli_set_charset($con, "utf8");
    if (mysqli_connect_errno()) {
        response_message(500,"Error: ");
    }
/*********** [ lesson file and les_file ] ************/
    $QAID = $_REQUEST["QAID"];
    $detail = $_REQUEST["detail"];
    $postby = $_REQUEST["postby"];
    $SID = $_REQUEST['ID'];
    $sql = "INSERT INTO `".$dbname."`.`reply`(`detail`, `postby`, `ownerID`,`QAID`) VALUES ('".$detail."','".$postby."','".$SID."','".$QAID."')";
    $result = mysqli_query($con,$sql);
    $sql =  "SELECT RID FROM reply ORDER BY QAID DESC LIMIT 1";
    $results_array = array(); 
    $result = mysqli_query($con,$sql);

    if(empty($result)){
        response_message(404,"No found");
        return;
    }

    while ($row = $result->fetch_assoc()) {
        $results_array[] = $row;
    }
    if(!($result))
    {
        response_message(500,"Unsuccess: result is not added");
    }
    else
    {
        response_message(200,"Success",$results_array);
    }

mysqli_free_result($result);
mysqli_close($con);

?>