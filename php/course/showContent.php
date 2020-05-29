<?php
    require_once "../global.php";
// connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);
    mysqli_set_charset($connect, "utf8");

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }

//file ของแต่ละบทเรียน
    $sql2 = "SELECT lesson.Lname,lesson.Ldes,lesson.SBID,file.*
             FROM lesson
             INNER JOIN file ON lesson.LID=file.LID";
             
    $result = mysqli_query($connect,$sql2);

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
