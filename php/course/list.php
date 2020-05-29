<?php
    require_once "../global.php";
// connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }

    $sql = "SELECT * FROM `".$dbname."`"; 
    $results_array = array(); // สร้างอาร์เรย์ไว้เก็บของ
    $result = mysqli_query($connect,$sql);//ติดต่อ + คิวลี่

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
    mysqli_close($con);
?>
