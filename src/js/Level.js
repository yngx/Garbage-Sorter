// This class will be responsible for the layers

(function (window){


	function Level(stage, contentManager, textLevel, gameWidth, gameHeight){
		this.levelStage = stage;
		this.levelContentManager = contentManager;

		this.textLevel = textLevel;
		this.levelWidth = gameWidth;
		this.levelHeight = gameHeight;

		// objects
		this.garbage = [];
		this.garbageBin = [];
		this.binTypes = [];

		//settings
		this.garbageInstances = 100;

	}

	Level.prototype.StartLevel = function() {
	// depending on the level, populate accordingly
	// need to figure out a better way of implementing this.... 

	if(this.textLevel === "basic"){
		this.binTypes = ['landfill', 'recycle'];
	}

	if(this.textLevel === "medium"){
		this.binTypes = ['landfill', 'recycle', 'compost'];
	}

	if(this.textLevel === "complex"){
		this.binTypes = ['landfill', 'recycle', 'compost', 'reuse'];
	}

	//set background of the level


	// place objects on the level
	// place the correct bins and the correct garbage


	};

	Level.prototype.LoadBins = function() {

		for(var i = 0; i < this.binTypes.length ; i++){
			this.garbageBin.push(new GarbageBin(this.binTypes[i], contentManager.GetBin(this.binTypes[i]), this.levelWidth, this.levelHeight, (100 + (250 * i)), 220));
		}

	};

	Level.prototype.LoadGarbage = function() {
		// start positions
		var pos_x = 0;
		var pos_y = 610;
	
		var randomGarbage = {};
	
		// generate garbage and assign start locations
		for(var i = 0; i < this.garbageInstances ; i++){
			// gets a random garbage based on available bin types for the level
			randomGarbage = this.levelContentManager.GetGarbage(this.binTypes);
			
			if(i != 0){
				pos_x -= (Math.floor(randomGarbage.img.width / 2));
			}
			
			// need to fix this line
			this.garbage.push(new Garbage(randomGarbage.bin, randomGarbage.img, screen_width, screen_height, pos_x, pos_y));
			pos_x -= (Math.floor(randomGarbage.img.width / 2)) + 10;
		}

	};

	Level.prototype.setText = function() {
		
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

	Level.prototype.setBackground = function() {
		// NOT implemented at the moment
	};

	// update
	Level.prototype.Update = function() {

	};

}(window));