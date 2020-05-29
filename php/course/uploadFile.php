<?php
    require_once "../global.php";
    // connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);
    mysqli_set_charset($connect, "utf8");
    
    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }
    /*********** [ upload file ] ************/
    $dir_path = "uploads/";
    $date = date_timestamp_get(date_create());//1586011057
    $canUpLoad = 1;
    // echo count($_FILES["fileToUpload"]["name"]);

    for($i=0; $i< count($_FILES["fileToUpload"]["name"]);$i++){
        $fileType = pathinfo($_FILES["fileToUpload"]["name"][$i],PATHINFO_EXTENSION);
        $name = $_FILES["fileToUpload"]["name"][$i];
        $file_path = $dir_path . $date . $i .".". $fileType;
        $canUpLoad = 1;
        

        //เช็คขนาดของไฟล์
        $max_size = 200000000;
        $fileSize = $_FILES["fileToUpload"]["size"][$i];
        if($fileSize > $max_size || $fileSize == "none"){
            $canUpLoad = 0;
            response_message(500,"Unsuccess: cannot upload");
        }
        
        if($canUpLoad == 1){
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"][$i], $_SERVER['DOCUMENT_ROOT']."/".$file_path)) {
                $sql = "INSERT INTO `".$dbname."`.`file` ( `Fname`, `Fpath`,`type`,`LID`) VALUES  ('".$name."','".$file_path."','".$fileType."','1')";
                $result = mysqli_query($connect,$sql);
                $sql2 = "UPDATE file SET LID = (SELECT lesson.LID FROM lesson ORDER BY LID DESC LIMIT 1)
                        WHERE LID = 1";
                $result2 = mysqli_query($connect,$sql2);
            }
        }
        // echo $_FILES["fileToUpload"]["tmp_name"][$i];
    }
    // echo $_FILES["fileToUpload"]["tmp_name"];
    $sql3 = "SELECT * FROM file WHERE LID = (SELECT lesson.LID FROM lesson ORDER BY LID DESC LIMIT 1)";
    $result3 = mysqli_query($connect,$sql3);
    if(empty($result3)){
        response_message(404,"No found");
        return;
    }

    while ($row = $result3->fetch_assoc()) {
        $results_array[] = $row;
    }
    if(empty($results_array)) {
        response_message(404,"No data found");
        return;
    }
    
    mysqli_close($connect);
    if($canUpLoad == 1){
        response_message(200,"Success",$results_array);
    }else{
        response_message(500,"Unsuccess: cannot upload");
    }
    
    mysqli_free_result($result);
    mysqli_free_result($result2);
    mysqli_free_result($result3);
    mysqli_close($connect);

?>
