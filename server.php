<?php
$openDoor = rand(1, 3);

if (isset($_POST['i']) && $openDoor == 1) {
	echo 1;	
}elseif (isset($_POST['i']) && $openDoor == 2) {
	echo 2;
}else {
	echo 3;
}

?>