<?php
    require_once "../global.php";
// connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }
    $root = $_SERVER['DOCUMENT_ROOT'];
    $dir = $_REQUEST['Fpath'];
    $path = $root."/".$dir;
    
    //delete file from FID
    $sql = "DELETE FROM file where FID = '".$_REQUEST["FID"]."'";
    $result = mysqli_query($connect,$sql);
    
    //delete file from directory
    if(file_exists($path)){
        unlink($path); 
        response_message(200,"Success");
    }else{
        response_message(500,"Unsuccess");
    }
    
    mysqli_free_result($result);
    mysqli_close($connect);
?>
