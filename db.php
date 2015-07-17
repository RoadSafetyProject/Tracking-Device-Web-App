<?php 

$GLOBALS['dbconn'] = pg_connect("host=localhost dbname=vehicle_tracking user=postgres password=1234")
or die('Could not connect: ' . pg_last_error());

?>