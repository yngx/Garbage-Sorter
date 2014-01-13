// This class will be responsible for the layers

(function (window){


	function Level(stage, contentManager, textLevel, gameWidth, gameHeight){

		this.levelStage = stage;
		this.levelContentManager = contentManager;

		this.textLevel = textLevel;
		this.levelWidth = gameWidth;
		this.levelHeight = gameHeight;

		this.levelText = null;
		this.levelSpeed = 1;

		// objects
		this.garbage = [];
		this.garbageBin = [];
		this.binTypes = [];

		//settings
		this.garbageInstances = 500;

	}

	Level.prototype.StartLevel = function() {
	// depending on the level, populate accordingly
	// need to figure out a better way of implementing this.... 
		if(this.textLevel === "one"){
			this.binTypes = ['landfill'];
			this.levelSpeed = 1;
		}

		if(this.textLevel === "four"){
			this.binTypes = ['landfill', 'recycle', 'compost', 'reuse'];
			this.levelSpeed = 1;
		}

		if(this.textLevel === "easy"){
			this.binTypes = ['landfill', 'recycle'];
			this.levelSpeed = 1;
		}

		if(this.textLevel === "normal"){
			this.binTypes = ['landfill', 'recycle', 'compost'];
			this.levelSpeed = 3;
		}

		if(this.textLevel === "hard"){
			this.binTypes = ['landfill', 'recycle', 'compost', 'reuse', 'electronics', 'chemical'];
			this.levelSpeed = 6;
		}


		// start 
		//this.LoadGarbage();
		this.LoadBins();
		
		/*
		for(var i = 0; i < this.garbage.length; i++){
			this.levelStage.addChild(this.garbage[i]);
		}
		*/

		for(var i = 0; i < this.garbageBin.length; i++){
			this.levelStage.addChild(this.garbageBin[i]);
		}


	};

	Level.prototype.SpeedUp = function() {
		this.levelSpeed++;
	}

	Level.prototype.SpeedDown = function() {
		if(this.levelSpeed > 1)
			this.levelSpeed--;
	}

	Level.prototype.LoadBins = function() {

		var xp = this.levelWidth / (this.binTypes.length + 1);
		var yp = this.levelHeight;

		var xPos;
		var yPos;

		var binCount = this.binTypes.length;

		/*
		// positions bin across
		for(var i = 0; i < this.binTypes.length ; i++){
			yPos = yp * .25;

			i === 0 ? xPos = xp - (xp / 2) : xPos = xp + (xp * i);

			if( i === this.binTypes.length - 1)
				 xPos = xp + (xp * i) + (xp/2);

			this.garbageBin.push(new GarbageBin(this.binTypes[i], contentManager.GetBin(this.binTypes[i]), xPos, yPos));
		}*/


		// position bins vertical 3 x 2
		binCount > 3 ? yPos = yp/ 4 : yPos = yp / (binCount + 1);
		binCount > 3 ? xPos = 300 : xPos = 450;

		var j = 0;
		for(var i = 0; i < this.binTypes.length ; i++){

			// happens once
			if(i === 3){
				xPos = 500;
				j = 0;
			}

			console.log("placed bin at x: " + xPos + " y: " + (yPos + (yPos * j)));
			this.garbageBin.push(new GarbageBin(this.binTypes[i], contentManager.GetBin(this.binTypes[i]), xPos, yPos + (yPos * j) ));
			j++;
		}


	};

	Level.prototype.LoadGarbage = function() {
		// start positions

		var pos_x = 0;
		var pos_y = this.levelHeight * .85;
	
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

	Level.prototype.setText = function(level) {
		
		// not implemented yet

	}

	Level.prototype.setBackground = function() {
		// NOT implemented at the moment
	};


	Level.prototype.handleCollision = function(objA, objB, i) {
		var xD = objA.x - objB.x;
		var yD = objA.y - objB.y;

		var dist = Math.sqrt(xD * xD + yD * yD);

		var point = 0;

		// if collision
		if(dist < objA.radius + objB.radius){
			if(!objA.pressed){
				if(objA.type === objB.type){
					point = 100;
				}
				else{
					point = -50;
				}

				this.levelStage.removeChild(objA.boundingBox);
				this.levelStage.removeChild(objA);
				this.garbage.splice(i, 1);
			}
		}

		return point;
	};

	// update later on... GET RID OF POINT INT AND POINT TEXT
	Level.prototype.Update = function() {

		var point = 0;
		for(var i = 0; i < this.garbage.length; i++)
		{
			this.garbage[i].tick(this.levelSpeed);
			for(var j = 0; j < this.garbageBin.length; j++){
				point += this.handleCollision(this.garbage[i], this.garbageBin[j], i);
			}
		}

		this.levelStage.update();
		return point;
	};

	window.Level = Level;
}(window));
