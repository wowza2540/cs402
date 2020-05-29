<?php
    require_once "../global.php";
// connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }
// `
    $lid = $_REQUEST["LID"];
    $qid = $_REQUEST["QID"];
    $results_array = array();

    //delete from sql
    $sql = "DELETE FROM answer where QID = '".$qid."'";
    $result = mysqli_query($connect,$sql);


    if(!($result))
        {
            response_message(500,"Unsuccess");
        }
        else
        {
            response_message(200,"Success");
        }
    
    mysqli_free_result($result);
    mysqli_close($connect);
?>
