
/**
 * Created by xaoyang on 12/12/13.
 */
 
(function (window){
    function Garbage(garbageType, imgGarbage, screen_width, screen_height, x_pos, y_pos){
        this.initialize(garbageType, imgGarbage, screen_width, screen_width, x_pos, y_pos);
    }
    
    Garbage.prototype = new createjs.Sprite();
    
    //public properties [not really sure what they do]
    Garbage.prototype.bounds = 0;   // visual radius size
    Garbage.prototype.hit = 0;  // average radial disparity

	Garbage.width;
	Garbage.height;
	Garbage.radius;
	Garbage.boundingBox;
    Garbage.pressed = false;
	
    // constructor:
    Garbage.prototype.Sprite_intialize = Garbage.prototype.initialize;

    // initialization
    Garbage.prototype.initialize = function (garbageType, imgGarbage, screen_width, screen_height, x_pos, y_pos){

       	this.width = imgGarbage.width;
       	this.height = imgGarbage.height;
       	
       	var halfX = Math.floor(imgGarbage.width / 2);
       	var halfY = Math.floor(imgGarbage.height / 2);
       	
        // becareful: if width exceeds the image, will not display the image
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgGarbage], // image to use
            frames: {width: imgGarbage.width, height: imgGarbage.height, regX: halfX, regY: halfY},
            animations: {
                move: [0,0, "move", 4]
            }
        });

        this.Sprite_intialize(localSpriteSheet);
        // start playing the first sequence:
        this.gotoAndPlay("move");    // animate

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
       
       	// create the bounding box for the object
       	this.boundingBox = new createjs.Shape();
        this.radius = Math.sqrt((this.width/2 * this.width/2) + (this.height/2 * this.height/2));
       	this.boundingBox.graphics.beginStroke("purple").ss(5,0,1).drawCircle(0, 0, this.radius);
       	this.boundingBox.visible = false;
        stage.addChild(this.boundingBox);
       	       
    }

    Garbage.prototype.tick = function() {
        this.x += this.vX * (this.direction * 2);
		
		this.boundingBox.x = this.x;
		this.boundingBox.y = this.y;
    }
	
	Garbage.prototype.on("pressmove", function(evt) {
		evt.target.x = evt.stageX;
		evt.target.y = evt.stageY;

        evt.target.pressed = true;
	});

    Garbage.prototype.on("pressup", function(evt) {
        evt.target.pressed = false;
        evt.target.boundingBox.visible = true;
    });
	
	Garbage.prototype.on("rollover", function(evt) {
		evt.target.alpha = .5;
        evt.target.boundingBox.visible = true;
		//console.log(evt.target.radius);
		//console.log(evt.target.type);
		//stage.addChild(evt.target.boundingBox);
	});
	
	
	Garbage.prototype.on("rollout", function(evt) {
		evt.target.alpha = 1;
        evt.target.boundingBox.visible = false;
		//stage.removeChild(evt.target.boundingBox);
	});

    window.Garbage = Garbage;
}(window))