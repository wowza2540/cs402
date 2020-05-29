<?php
    require_once "../global.php";
// connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);
    mysqli_set_charset($connect, "utf8");

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }
    $sid = $_REQUEST["SID"];

    // $sql =  "SELECT subject.*,study.*,student.SID
    //          FROM ((study
    //          INNER JOIN subject ON study.SBID = subject.SBID)
    //          INNER JOIN student ON study.SID = '".$sid."')";
    $sql = "SELECT * FROM study
            INNER JOIN subject ON subject.SBID = study.SBID AND study.SID = '".$sid."'";
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
