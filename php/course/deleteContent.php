<?php
    require_once "../global.php";
// connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }

    //delete file in directory
    $dir =$_SERVER['DOCUMENT_ROOT']."/";
    $sql = "SELECT Fpath FROM file WHERE LID='".$_REQUEST["LID"]."'";
    // $sql = "SELECT Fpath FROM file WHERE Lid='105'";
    $result = mysqli_query($connect,$sql);
    while ($row = $result->fetch_assoc()) {
        $path = $dir.$row['Fpath'];
        if(file_exists($path)){
            unlink($path); 
        }else{
            response_message(500,"Unsuccess");
        }
    }
    //delete from sql
    $sql2 = "DELETE FROM lesson where LID = '".$_REQUEST["LID"]."'";
    $result2 = mysqli_query($connect,$sql2) or response_message(500,"Unsuccess");
    $sql3 = "DELETE FROM file where LID = '".$_REQUEST["LID"]."'";
    $result = mysqli_query($connect,$sql3) or response_message(500,"Unsuccess");


    response_message(200,"Success");
    
    mysqli_free_result($result);
    mysqli_close($connect);
?>
