<?php
//    echo "hello world";

    include ('dbconnection.php');

    $sql2 = "SELECT city,lat,lng,temp FROM locations";

    $result = mysqli_query($conn,$sql2);

    $json_array = array();

    while($row = $result->fetch_assoc()){
        $json_var->city = $row['city'];
        $json_var->lat = $row['lat'];
        $json_var->lng = $row['lng'];
        $json_var->temp = $row['temp'];
        $json_object = json_encode($json_var);
        echo $json_object,"\n";
//        $json_array[] = $json_object;
    }

    echo $json_array[0];

?>