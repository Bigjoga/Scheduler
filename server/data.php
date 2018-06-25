<?php
 
include('bigjoga/Desktop/gCal_proxy/servergoogle_proxy.php');
 
$calendar = new GoogleCalendarProxy("gajicnikola41@gmail.com",
                                    "n1i9k1o2l19a94", 
                                    file_get_contents("AIzaSyCWCU7Zc4897o_FyWQOsbpWcO-VUKzn3yo"),
                                    "gajicnikola41@gmail.com");
 
$calendar->connect();
?>