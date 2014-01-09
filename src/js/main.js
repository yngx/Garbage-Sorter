/**
 * Created by xaoyang on 12/13/13.
 */
 
var canvas;
var stage;
var level;
var contentManager;
var screen_width;
var screen_height;

var titleText;
var scoreText;
var timerText;
var pointText;
var pointInt = 0;

// timer stuff
var currentCountDown;

var garbage;
var recycle;
var reuse;
var landfill;
var compost;

var INSTANCE_COUNT = 100;
var START_TIME = 30000; //ms
var WARNING_TIME = 20000; //ms
var GAME_ON = true;

// SET UP SETTINGS CLASS
var no_type_map = {
	0 : "compost",
	1 : "landfill",
	2 : "landfill",
	3 : "reuse", 
	4 : "recycle", 
	5 : "recycle", 
};

// uses date.now() to set up timer
function createCountDown(timeRemaining) {
    var startTime = Date.now();
    return function() {
       return timeRemaining - ( Date.now() - startTime );
    }
}

// takes millseconds and converts to seconds with one digit following the period
function convertMStoS(num, p){
	p = typeof p !== 'undefined' ? p : 1;
	return (num/ 1000).toFixed(p);
}

function init(){
    //console.log("initialized");
    
    canvas = document.getElementById("testCanvas");

    stage = new createjs.Stage(canvas);
    screen_width = canvas.width;
    screen_height= canvas.height;
    
    // enable mouse/touch events
	stage.enableMouseOver(10);
	createjs.Touch.enable(stage);

    contentManager = new ContentManager();
    contentManager.SetDownloadCompleted(startGame);
    contentManager.StartDownload();

    //level = new Level(stage, contentManager, 'basic', screen_width, screen_height);
}

function reset(){
    stage.removeAllChildren();
    createjs.Ticker.removeAllEventListeners();
    stage.update();
    
    pointInt = 0;
    GAME_ON = true;
    currentCountDown = createCountDown(START_TIME); 
    console.log("Game has been reset");
}

// initialize garbage items
function loadGarbage() {

	var pos_x = 0;
	var pos_y = 610;

	garbage = new Array(INSTANCE_COUNT);
	var randomGarbage = {};

	// generate garbage and assign start locations
	for(var i = 0; i < garbage.length ; i++){
		
		// gets a random garbage based on available bin types for the level
		randomGarbage = contentManager.GetGarbage(['compost']);

		if(i != 0){
			pos_x -= (Math.floor(randomGarbage.img.width / 2));
		}
		
		// need to fix this line
		garbage[i] = new Garbage(randomGarbage.bin, randomGarbage.img, screen_width, screen_height, pos_x, pos_y);
		pos_x -= (Math.floor(randomGarbage.img.width / 2)) + 10;
	}
}

function loadBins() {

	recycle  = new GarbageBin('recycle', contentManager.GetBin('recycle'), screen_width, screen_height, 100, 220);
	compost  = new GarbageBin('compost', contentManager.GetBin('compost'), screen_width, screen_height, 350, 220);
	landfill = new GarbageBin('landfill', contentManager.GetBin('landfill'), screen_width, screen_height, 600, 220);
	reuse	 = new GarbageBin('reuse', contentManager.GetBin('reuse'), screen_width, screen_height, 850, 220);

}

function setText() {

    titleText = new createjs.Text("Garbage Sorter", "bold 36px Arial", "#ffffff");
    titleText.x = 10;
    titleText.y = 10;

    timerText = new createjs.Text("Time Remaining: ", "bold 20px Arial", "#ffffff");
    timerText.x = 15;
    timerText.y = 45;
	
	timeText = new createjs.Text( convertMStoS(START_TIME) + " s", "bold 20px Arial", "#ffffff");
	timeText.x = 180;
	timeText.y = 45;
		
	scoreText = new createjs.Text("SCORE:", "bold 20px Arial", "#ffffff");
	scoreText.x = screen_width - 200;
	scoreText.y = 15;
	
	pointText = new createjs.Text(pointInt, "bold 20px Arial", "#ffffff");
	pointText.x = screen_width - 105;
	pointText.y = 15;
}

function startGame(){
    console.log("Game has started");
	
	//loadBins	
	loadBins();	
		
	// load garbage
	loadGarbage();
	
	// set up text
	setText();

	// add bins
	stage.addChild(recycle);
	stage.addChild(compost);
	stage.addChild(landfill);
	stage.addChild(reuse);
	
	// add childs to the screen
	for(var j = 0; j < garbage.length; j++){
		stage.addChild(garbage[j]);
	}	

    stage.addChild(titleText);
    stage.addChild(timerText);
    stage.addChild(timeText);
    stage.addChild(scoreText);
	stage.addChild(pointText);
	
	// start timer
	currentCountDown = createCountDown(START_TIME); 
		
    stage.update();
    createjs.Ticker.addEventListener("tick", tick);
    
    createjs.Ticker.setFPS(60);
}

function tick(){

	if(GAME_ON){
		for(var i = 0; i < garbage.length; i++){
		
			garbage[i].tick(); 
			timeText.text = convertMStoS(currentCountDown()) + " seconds";   
			
			if(convertMStoS(currentCountDown()) < 0 || convertMStoS(currentCountDown()) == 0){
				timeText.text = 0;
				GAME_ON = !GAME_ON;
			}
			if(convertMStoS(currentCountDown()) < convertMStoS(WARNING_TIME)){
				timeText.color = "red";
			}
			// check recycle collison
			if(collision(garbage[i], recycle))
			{	
				if(!garbage[i].pressed){
					handleCollision(garbage[i], recycle);
					stage.removeChild(garbage[i]);
					garbage.splice(i, 1);
				}
			}	
		
			// check compost collison
			if(collision(garbage[i], compost))
			{
				if(!garbage[i].pressed){
					handleCollision(garbage[i], compost);
					stage.removeChild(garbage[i]);
					garbage.splice(i, 1);
				}
			}
		
			// check reuse collison
			if(collision(garbage[i], reuse))
			{
				if(!garbage[i].pressed){
					handleCollision(garbage[i], reuse);
					stage.removeChild(garbage[i]);
					garbage.splice(i, 1);
				}
			}
		
			// check landfill collison
			if(collision(garbage[i], landfill))
			{
				if(!garbage[i].pressed){
					handleCollision(garbage[i], landfill);
					stage.removeChild(garbage[i]);
					garbage.splice(i, 1);
				}
			}
	}
	
    stage.update();
    }
}

function collision(objA, objB) {
	var xD = objA.x - objB.x;
	var yD = objA.y - objB.y;
	
	var dist = Math.sqrt(xD * xD + yD * yD);
	return dist < objA.radius + objB.radius;
}

// checks to see if the two types matches
function isSameType(objA, objB) {
	return objA.type === objB.type;
}

// handles the collision 
function handleCollision(objA, objB){
	
	if(isSameType(objA, objB)){
		console.log('are same type');
		
		pointInt += 100;
		pointText.text = pointInt;
		
	}
	else{
		console.log('not the same type');
		
		pointInt -= 50;
		pointText.text = pointInt;
	}
}