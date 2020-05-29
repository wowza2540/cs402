<?php
    require_once "../global.php";
// connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);
    mysqli_set_charset($connect, "utf8");

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }

     $sbid = $_REQUEST["SBID"];
     
    $sql = "SELECT * FROM student
            INNER JOIN study ON study.SID = student.SID AND study.SBID = '".$sbid."'";     
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
