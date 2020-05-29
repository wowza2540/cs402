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
    $lid = $_POST["LID"] or response_message(500,"Unsuccess");
    $tmp = $_FILES["fileToUpload"]["name"] or response_message(500,"Unsuccess");

    for($i=0; $i< count($_FILES["fileToUpload"]["name"]);$i++){
        $fileType = pathinfo($_FILES["fileToUpload"]["name"][$i],PATHINFO_EXTENSION);
        $name = $_FILES["fileToUpload"]["name"][$i];
        $file_path = $dir_path . $date . $i .".". $fileType;
        $canUpLoad = 1;
        

        //Check type
        // $allowed = array('docx', 'pdf', 'ppt','mp4');
        // if (!in_array($fileType, $allowed)) {
        //     $canUpLoad = 0;
        //     response_message(500,"Unsuccess: cannot upload");
        // }

        //เช็คขนาดของไฟล์
        $max_size = 200000000;
        $fileSize = $_FILES["fileToUpload"]["size"][$i];
        if($fileSize > $max_size || $fileSize == "none"){
            $canUpLoad = 0;
            response_message(500,"Unsuccess: cannot upload");
        }
        
        if($canUpLoad == 1){
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"][$i], $_SERVER['DOCUMENT_ROOT']."/".$file_path)) {
                $sql = "INSERT INTO `".$dbname."`.`file` ( `Fname`, `Fpath`,`type`,`LID`) VALUES  ('".$name."','".$file_path."','".$fileType."',$lid)";
                $result = mysqli_query($connect,$sql) or response_message(500,"Unsuccess: cannot upload");
            }else{
                response_message(500,"Unsuccess: cannot upload");
            }
        }
    }
    $sql2 = "SELECT * FROM file WHERE LID = $lid";
    $result2 = mysqli_query($connect,$sql2);
    if(empty($result2)){
        response_message(404,"No found");
        return;
    }

    while ($row = $result2->fetch_assoc()) {
        $results_array[] = $row;
    }
    // mysqli_free_result($result);
    mysqli_close($connect);
    response_message(200,"Success",$results_array);
?>
