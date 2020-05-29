<?php
    require_once "../global.php";
// connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }
// ลบชื่อวิชา
//noti lesson file qanda study subject
//ลบคอนเท้นต์ทั้งหมด
//ลบไฟล์ ลบคอมเม้นต์
    $sbid = $_REQUEST["SBID"];
    $results_array = array();

    //delete from sql 
    
    $sql2 = "DELETE   FROM notification WHERE notification.SBID = '".$sbid."'";
    $result = mysqli_query($connect,$sql2)  or response_message(500,"Unsuccess sql2");
    $sql2 = "DELETE   FROM subject WHERE subject.SBID = '".$sbid."'";
    $result = mysqli_query($connect,$sql2)  or response_message(500,"Unsuccess sql3");
    $sql2 = "DELETE   FROM study WHERE study.SBID = '".$sbid."'";
    $result = mysqli_query($connect,$sql2)  or response_message(500,"Unsuccess sql4");

    
    


    response_message(200,"Success",$results_array);
    
    
    mysqli_free_result($result);
    mysqli_close($connect);
?>
