var i, door_selected, winning_door, open_door, played, win_change, win_stick, changed, count, id;

win_change = 0;
win_stick = 0;
count = 0;

door = new Array(4);

door[0] = new Image();
door[0].src = "http://localhost:8080/gruppe18/ue6/pics/open_door_goat.png";
door[1] = new Image();
door[1].src = "http://localhost:8080/gruppe18/ue6/pics/closed_door.png";
door[2] = new Image();
door[2].src = "http://localhost:8080/gruppe18/ue6/pics/door_selected.png";
door[3] = new Image();
door[3].src = "http://localhost:8080/gruppe18/ue6/pics/open_door_car.png";

initialise();

function pictureChange(pic, img)
{
	if(pic == 1) {document.getElementById("door1").src = door[img].src;}
	if(pic == 2) {document.getElementById("door2").src = door[img].src;}
	if(pic == 3) {document.getElementById("door3").src = door[img].src;}
}

function initialise() {
	winning_door = Math.round((Math.random() * 2)) + 1;
	door_selected = 0;
	open_door = 0;
	played = 0;
	changed = 0;
	document.getElementById("information").innerHTML = "Select a door and click Play";
	document.getElementById("number_of_games").innerHTML = count;

	for(i = 1; i < 4; i++) {
		pictureChange(i, 1);
	}
}

function selectDoor(n) {
	if(n != door_selected && !(played)){
		pictureChange(door_selected, 1);
		pictureChange(n, 2);
		door_selected = n;
	}

	if(n != door_selected && n != open_door && played) {
		if(changed) {
			changed = 0;
			document.getElementById("information").innerHTML = "You are sticking with your original choice.  Click <em>Play</em> to continue.";
		} else {
			changed = 1;
			document.getElementById("information").innerHTML = "You have changed your mind!  Click <em>Play</em> to continue.";
		}

		pictureChange(door_selected, 1);
		pictureChange(n, 2);
		door_selected = n;
	}
}

function show() {
	if(played) {		
		if(played == 1) {
			pictureChange(winning_door, 3);
			if(winning_door == door_selected) {
				document.getElementById("information").innerHTML = "You've won!  Click <em>Play</em> or <em>Reset</em> to play again.";

				if(changed) {
					win_change++;
				} else {
					win_stick++;
				}
			} else {
				document.getElementById("information").innerHTML = "You've lost!  Click <em>Play</em> or <em>Reset</em> to play again.";

				if(changed) {
					win_stick++;
				} else {
					win_change++;
				}
			}

			played++;
			count++;

			document.getElementById("win_with_change").innerHTML = (Math.round(win_change * 100 / count));
			document.getElementById("win_with_stick").innerHTML = (Math.round(win_stick * 100 / count));
			document.getElementById("number_of_games").innerHTML = count;

		} else {
			initialise();
		}
	} else {
		if(door_selected == 0) {
			alert("You must select a door before clicking the Play button!");
		} else {
			var xhttp = new XMLHttpRequest();
			xhttp.open("POST", "server.php", true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			
			xhttp.onload = function() {
				i = this.responseText;
			}
			if (winning_door == 1) {
				xhttp.send("i=1");
			} else if (winning_door ==2) {
				xhttp.send("i=2");
			} else {
				xhttp.send("i=3");
			}
			
			for(i = Math.round((Math.random() * 2)) + 1; (i == door_selected) || (i == winning_door); i = Math.round((Math.random() * 2)) + 1);
				open_door = i;
			console.log(open_door);
			pictureChange(i, 0);
			played = 1;
			document.getElementById("information").innerHTML = "Do you want to change your mind?  Select a door and click <em>Play</em>.";
		}
	}
}

