var h1 = document.querySelector("h1");
var numSquares = 6;
var playersNum = [];
var players = [];
var pickedPlayer;
var squares = document.querySelectorAll(".square");
var playerImage = document.querySelector(".player-img")
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init(){
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab name of clicked square
			var clickedPlayer = this.textContent;
			//compare player to pickedplayer
			if(clickedPlayer === pickedPlayer.name){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changePlayers(clickedPlayer);
			} else {
				delete this.textContent;
				this.style.background = "Red";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}



function reset(){
	playersNum = distinctRandomNumber(numSquares);
	players= createPlayer(playersNum);
	//pick a new random player from array
	pickedPlayer = pickplayer();
	//change colorDisplay to match picked Color
	playerImage.setAttribute("src", pickedPlayer.image)
	resetButton.textContent = "New Player"
	messageDisplay.textContent = "";
	//change names of squares
	for(var i = 0; i < squares.length; i++){
		if(players[i]){
			squares[i].style.background = "steelblue";
			squares[i].style.display = "block"
			squares[i].textContent = players[i].name;
			h1.style.background = "steelblue";
		} else {
			squares[i].style.display = "none";
		}
	}
}

resetButton.addEventListener("click", function(){
	reset();
})

function changePlayers(player){
	for(var i = 0; i < squares.length; i++){
		//change each Player to correct player
		squares[i].textContent = player;
		squares[i].style.background = "Green";
		h1.style.background = "Green";
		
	}
}

function pickplayer(){
	var random = Math.floor(Math.random() * players.length);
	return players[random];
}


function distinctRandomNumber(numSquares){
	var arr = [];
	while(arr.length < numSquares){
    var r = Math.floor(Math.random() * 30) + 1;
    if(arr.indexOf(r) === -1) arr.push(r);
}
	return arr;
}

function createPlayer(arr){
	var pl = [];
	for (var index = 0; index < arr.length; index++) {
		pl.push(dataset[arr[index]]);
	}
 return pl;
}
