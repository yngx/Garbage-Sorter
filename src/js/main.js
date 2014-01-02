/**
 * Created by xaoyang on 12/13/13.
 */
var canvas;
var stage;
var screen_width;
var screen_height;
var garbage;
var contentManager;

function init(){
    console.log("initialized");

    canvas = document.getElementById("testCanvas");

    stage = new createjs.Stage(canvas);
    screen_width = canvas.width;
    screen_height= canvas.height;

    contentManager = new ContentManager();
    contentManager.SetDownloadCompleted(startGame);
    contentManager.StartDownload();
}

function reset(){
    stage.removeAllChildren();
    createjs.Ticker.removeAllListeners();
    stage.update();

    console.log("Game has been reset");
}

function startGame(){
    console.log("Game has started");
	
	var pos_x = 0;
	var pos_y = 410;
	
	garbage = new Array(100);
	var randomImage; 
	
	for(var i = 0; i < garbage.length; i++){
		
		randomImage = contentManager.GetRandomImage();
				
		if(i != 0)
		{
			pos_x -= (Math.floor(randomImage.width/2));
		}
		
		garbage[i] = new Garbage('Landfill', randomImage, screen_width, screen_height, pos_x, pos_y);
		
		// fixes the position of the next object
		pos_x -= (Math.floor(randomImage.width/2)) + 10;
	}

	// text for the game
    var title = new createjs.Text("Garbage Sorter", "bold 36px Arial", "#ffffff");
    title.x = 10;
    title.y = 10;

    var timer = new createjs.Text("Time Remaining: ", "bold 20px Arial", "#ffffff");
    timer.x = 15;
    timer.y = 45;
	
	var score = new createjs.Text("Score: ", "bold 20px Arial", "#ffffff");
	score.x = screen_width - 100;
	score.y = 15;

	// add childs to the screen
	for(var j = 0; j < garbage.length; j++){
		stage.addChild(garbage[j]);
	}	

    stage.addChild(title);
    stage.addChild(timer);
    stage.addChild(score);
	
    stage.update();
    createjs.Ticker.addListener(window);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
}


function tick(){
    //console.log("Game tick");
	for(var i = 0; i < garbage.length; i++){
		garbage[i].tick();
	}

    stage.update();
}