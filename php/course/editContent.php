<?php
    require_once "../global.php";
// connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);
    mysqli_set_charset($connect, "utf8");

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }
// `
    //update
    $sql = "UPDATE lesson SET 
			Lname = '".$_REQUEST["Lname"]."' ,
			Ldes = '".$_REQUEST["Ldes"]."' ,
            SBID = '".$_REQUEST["SBID"]."'
			where LID = '".$_REQUEST["LID"]."'";
    $result = mysqli_query($connect,$sql);

    if(!($result))
        {
            response_message(500,"Unsuccess");
        }
        else
        {
            response_message(200,"Success");
        }
    
    mysqli_free_result($result);
    mysqli_close($connect);
?>
