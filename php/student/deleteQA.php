<?php
    require_once "../global.php";
// connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }
// `
    $qaid = $_REQUEST["QAID"];
    $results_array = array();

    //delete from sql
    $sql = "DELETE FROM qanda where QAID = '".$qaid."'";
    $result = mysqli_query($connect,$sql) or response_message(500,"Unsuccess");

    response_message(200,"Success");
 
    
    mysqli_free_result($result);
    mysqli_close($connect);
?>
