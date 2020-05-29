<?php
    require_once "../global.php";
//connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);
    mysqli_set_charset($connect, "utf8");

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }
// `
    $deletefrom = $_REQUEST['SBID'];
    $sql = "DELETE FROM `study` WHERE  SBID = '".$deletefrom."'"; 
    $result = mysqli_query($connect,$sql)  or response_message(500,"Unsuccess");

    response_message(200,"Success");

    
    
    mysqli_free_result($result);
    mysqli_close($connect);
?>
