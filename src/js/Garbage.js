
/**
 * Created by xaoyang on 12/12/13.
 */
(function (window){
    function Garbage(garbageType, imgGarbage, screen_width, screen_height, x_pos, y_pos){
        this.initialize(garbageType, imgGarbage, screen_width, screen_width, x_pos, y_pos);
    }
    
    Garbage.prototype = new createjs.BitmapAnimation();
    
    //public properties
    Garbage.prototype.bounds = 0;   // visual radius size
    Garbage.prototype.hit = 0;  // average radial disparity

    // constructor:
    Garbage.prototype.BitmapAnimation_intialize = Garbage.prototype.initialize;

    // initialization
    Garbage.prototype.initialize = function (garbageType, imgGarbage, screen_width, screen_height, x_pos, y_pos){
        console.log("Garbage object initialized");
        console.log("Garbage type: " +  garbageType);
        console.log("Garbage img src: " + imgGarbage.src);
       
       	var halfX = Math.floor(imgGarbage.width / 2);
       	var halfY = Math.floor(imgGarbage.height / 2);
       	
        // if width exceeds the image, will not display the image
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgGarbage], // image to use
            frames: {width: imgGarbage.width, height: imgGarbage.height, regX: halfX, regY: halfY},
            animations: {
                move: [0,0, "move", 4]
            }
        });

        this.BitmapAnimation_intialize(localSpriteSheet);
        // start playing the first sequence:
        this.gotoAndPlay("move");    // animate

        //this.shadow = new createjs.Shadow("#000", 3,2,2);
		
		// garbage type
        this.type = garbageType;
        this.direction = 1;

        this.screen_width = screen_width;
        this.screen_height = screen_height;
		
		// default starting position
		this.x = x_pos;
		this.y = y_pos;
		
        //velocity
        this.vX = 1;
        this.vY = 0;
        // starting directly at the first frame of the walk_h sequence
        this.currentFrame = 0;
    }

    Garbage.prototype.tick = function() {
        this.x += this.vX * this.direction;

		/*
        if(this.x > screen_width + ){
            this.x = - 70;
        }*/
    }
	
	Garbage.prototype.onPress = function(evt) {
	    evt.onMouseMove = function(evt) {
	        evt.target.x = evt.stageX;
	        evt.target.y = evt.stageY;
	    }
	    evt.onMouseUp = function(evt){
	        console.log("up");
	        if(evt.target.y < 370)
	            evt.target.vX = 0;
	        else
	        {
	            evt.target.vX = 1;
	        }    
	         
	           
	        
	    }
	}
	
	
    /*
    Garbage.prototype.hitPoint = function (tX, tY){
        return this.hitRadius(tX, tY, 0);
    }

    Garbage.prototype.hitRadius = function (tX, tY, tHit){
        //early returns speed it up
        if (tX - tHit > this.x + this.hit) { return; }
        if (tX + tHit < this.x - this.hit) { return; }
        if (tY - tHit > this.y + this.hit) { return; }
        if (tY + tHit < this.y - this.hit) { return; }

        //now do the circle distance test
        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
    }
    */

    window.Garbage = Garbage;
}(window))