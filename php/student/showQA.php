<?php
    require_once "../global.php";
    $connect = mysqli_connect($servername,$username,$password,$dbname);
    mysqli_set_charset($connect, "utf8");
    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }

    $fid = $_REQUEST["FID"];
    $sql =  "SELECT * FROM qanda WHERE qanda.FID = $fid";
    $results_array = array(); 
    $result = mysqli_query($connect,$sql);

    if(empty($result)){
        response_message(404,"No found");
        return;
    }

    while ($row = $result->fetch_assoc()) {
        $results_array[] = $row;
    }
    
    if(empty($results_array)) {
        response_message(404,"No data found");
        return;
    }
    
    response_message(200,"Success",$results_array);
    mysqli_free_result($result);
    mysqli_close($connect);
?>