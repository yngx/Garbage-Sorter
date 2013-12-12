/**
 * Created by xaoyang on 12/10/13.
 */
var canvas;
var stage;
var screen_width;
var screen_height;
var numImages;

var bmpAnimationBanana;
var bmpAnimationCellPhone;
var bmpAnimationChips;
var bmpAnimationPlasticBag;
var bmpAnimationShirt;
var bmpAnimationWaterBottle;

var bmpAnimationLandfill;

var imgLandfill = new Image();


var imgBanana = new Image();
var imgCellphone = new Image();
var imgChips = new Image();
var imgPlasticBag = new Image();
var imgShirt = new Image();
var imgWaterBottle = new Image();

function init() {
    numImages = 0;

    canvas = document.getElementById("testCanvas");

    imgLandfill.onload = handleImageLoad;
    imgLandfill.onerror = handleImageError;
    imgLandfill.src = "landfill.png"

    //ugly but loads the images
    imgBanana.onload = handleImageLoad;
    imgBanana.onerror = handleImageError;
    imgBanana.src = "banana.png";

    imgCellphone.onload = handleImageLoad;
    imgCellphone.onerror = handleImageError;
    imgCellphone = "cellphone.png"

    imgChips.onload = handleImageLoad;
    imgChips.onerror = handleImageError;
    imgChips = "chips.png"

    imgPlasticBag.onload = handleImageLoad;
    imgPlasticBag.onerror = handleImageError;
    imgPlasticBag = "plasticbag.png"

    imgShirt.onload = handleImageLoad;
    imgShirt.onerror = handleImageError;
    imgShirt = "shirt.png"

    imgWaterBottle.onload = handleImageLoad;
    imgWaterBottle.onerror = handleImageError;
    imgWaterBottle = "waterbottle.png"

}

function reset() {
    stage.removeAllChildren();
    createjs.Ticker.removeAllListeners();
    stage.update();
}

function handleImageLoad(e) {
    numImages++;

    //if(numImages === 6)
    startGame();
}

function startGame() {
    // create a new stage and point it at our canvas:
    stage = new createjs.Stage(canvas);
    // grab canvas width and height for later calculations:
    screen_width = canvas.width;
    screen_height = canvas.height;

    //DRAW LINE
    var topLine = new createjs.Shape();
    topLine.graphics.beginFill("#000000").drawRect(0,320,screen_width,5);
    stage.addChild(topLine);

    var bottomLine = new createjs.Shape();
    bottomLine.graphics.beginFill("#000000").drawRect(0,495,screen_width,5);
    stage.addChild(bottomLine);
    //

    //landfill
    var spriteSheetLandfill = new createjs.SpriteSheet({
        images: [imgLandfill],
        frames: {width: 133, height: 233, regX: 66, regY: 117},
        animations: {
            walk: [0, 0, "walk"]
        }
    });

    // create a BitmapAnimation instance to display and play back the sprite sheet:
    bmpAnimationLandfill = new createjs.BitmapAnimation(spriteSheetLandfill);
    // start playing the first sequence:
    bmpAnimationLandfill.gotoAndPlay("walk"); //animate
    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    bmpAnimationLandfill.shadow = new createjs.Shadow("#454", 0, 5, 4);
    bmpAnimationLandfill.name = "landfill";
    bmpAnimationLandfill.direction = 90;
    bmpAnimationLandfill.x = 70;
    bmpAnimationLandfill.y = 150;
    // have each monster start at a specific frame
    bmpAnimationLandfill.currentFrame = 0;
    stage.addChild(bmpAnimationLandfill);
    //


    // DO I NEED TO CREATE A SPRITESHEET FOR EVERY NEW THING?
    // create spritesheet and assign the associated data.
    var spriteSheetBanana = new createjs.SpriteSheet({
        // image to use
        images: [imgBanana],
        // width, height & registration point of each sprite
        frames: {width: 151, height: 152, regX: 75, regY: 76},
        animations: {
            walk: [0, 0, "walk"]
        }
    });

    var spriteSheetCellPhone = new createjs.SpriteSheet({
        // image to use
        images: [imgCellphone],
        // width, height & registration point of each sprite
        frames: {width: 109, height: 152, regX: 50, regY: 76},
        animations: {
            walk: [0, 0, "walk"]
        }
    });

    var spriteSheetChips = new createjs.SpriteSheet({
        // image to use
        images: [imgChips],
        // width, height & registration point of each sprite
        frames: {width: 127, height: 152, regX: 65, regY: 76},
        animations: {
            walk: [0, 0, "walk"]
        }
    });

    var spriteSheetPlasticBag = new createjs.SpriteSheet({
        // image to use
        images: [imgPlasticBag],
        // width, height & registration point of each sprite
        frames: {width: 127, height: 152, regX: 65, regY: 76},
        animations: {
            walk: [0, 0, "walk"]
        }
    });

    var spriteSheetShirt = new createjs.SpriteSheet({
        // image to use
        images: [imgShirt],
        // width, height & registration point of each sprite
        frames: {width: 161, height: 152, regX: 65, regY: 76},
        animations: {
            walk: [0, 0, "walk"]
        }
    });

    var spriteSheetWaterBottle = new createjs.SpriteSheet({
        // image to use
        images: [imgWaterBottle],
        // width, height & registration point of each sprite
        frames: {width: 101, height: 152, regX: 65, regY: 76},
        animations: {
            walk: [0, 0, "walk"]
        }
    });


    // create a BitmapAnimation instance to display and play back the sprite sheet:
    bmpAnimationBanana = new createjs.BitmapAnimation(spriteSheetBanana);
    // start playing the first sequence:
    bmpAnimationBanana.gotoAndPlay("walk"); //animate
    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    bmpAnimationBanana.shadow = new createjs.Shadow("#454", 0, 5, 4);
    bmpAnimationBanana.name = "banana";
    bmpAnimationBanana.direction = 90;
    bmpAnimationBanana.vX = 1;
    bmpAnimationBanana.x = 16;
    bmpAnimationBanana.y = 410;
    // have each monster start at a specific frame
    bmpAnimationBanana.currentFrame = 0;
    stage.addChild(bmpAnimationBanana);

    // create a BitmapAnimation instance to display and play back the sprite sheet:
    bmpAnimationCellPhone = new createjs.BitmapAnimation(spriteSheetCellPhone);
    // start playing the first sequence:
    bmpAnimationCellPhone.gotoAndPlay("walk"); //animate
    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    bmpAnimationCellPhone.shadow = new createjs.Shadow("#454", 0, 5, 4);
    bmpAnimationCellPhone.name = "cellphone";
    bmpAnimationCellPhone.direction = 90;
    bmpAnimationCellPhone.vX = 1;
    bmpAnimationCellPhone.x = -136;
    bmpAnimationCellPhone.y = 410;
    // have each monster start at a specific frame
    bmpAnimationCellPhone.currentFrame = 0;
    stage.addChild(bmpAnimationCellPhone);

    // create a BitmapAnimation instance to display and play back the sprite sheet:
    bmpAnimationChips = new createjs.BitmapAnimation(spriteSheetChips);
    // start playing the first sequence:
    bmpAnimationChips.gotoAndPlay("walk"); //animate
    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    bmpAnimationChips.shadow = new createjs.Shadow("#454", 0, 5, 4);
    bmpAnimationChips.name = "cellphone";
    bmpAnimationChips.direction = 90;
    bmpAnimationChips.vX = 1;
    bmpAnimationChips.x = -279;
    bmpAnimationChips.y = 410;
    // have each monster start at a specific frame
    bmpAnimationChips.currentFrame = 0;
    stage.addChild(bmpAnimationChips);

    //Add plastic bag, shirt, waterbottle
    // create a BitmapAnimation instance to display and play back the sprite sheet:
    bmpAnimationPlasticBag = new createjs.BitmapAnimation(spriteSheetPlasticBag);
    // start playing the first sequence:
    bmpAnimationPlasticBag.gotoAndPlay("walk"); //animate
    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    bmpAnimationPlasticBag.shadow = new createjs.Shadow("#454", 0, 5, 4);
    bmpAnimationPlasticBag.name = "cellphone";
    bmpAnimationPlasticBag.direction = 90;
    bmpAnimationPlasticBag.vX = 1;
    bmpAnimationPlasticBag.x = -440;
    bmpAnimationPlasticBag.y = 410;
    // have each monster start at a specific frame
    bmpAnimationPlasticBag.currentFrame = 0;
    stage.addChild(bmpAnimationPlasticBag);

    // create a BitmapAnimation instance to display and play back the sprite sheet:
    bmpAnimationShirt = new createjs.BitmapAnimation(spriteSheetShirt);
    // start playing the first sequence:
    bmpAnimationShirt.gotoAndPlay("walk"); //animate
    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    bmpAnimationShirt.shadow = new createjs.Shadow("#454", 0, 5, 4);
    bmpAnimationShirt.name = "shirt";
    bmpAnimationShirt.direction = 90;
    bmpAnimationShirt.vX = 1;
    bmpAnimationShirt.x = -650;
    bmpAnimationShirt.y = 410;
    // have each monster start at a specific frame
    bmpAnimationShirt.currentFrame = 0;
    stage.addChild(bmpAnimationShirt);

    // create a BitmapAnimation instance to display and play back the sprite sheet:
    bmpAnimationWaterBottle = new createjs.BitmapAnimation(spriteSheetWaterBottle);
    // start playing the first sequence:
    bmpAnimationWaterBottle.gotoAndPlay("walk"); //animate
    // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
    // of animated rats if you disabled the shadow.
    bmpAnimationWaterBottle.shadow = new createjs.Shadow("#454", 0, 5, 4);
    bmpAnimationWaterBottle.name = "shirt";
    bmpAnimationWaterBottle.direction = 90;
    bmpAnimationWaterBottle.vX = 1;
    bmpAnimationWaterBottle.x = -770;
    bmpAnimationWaterBottle.y = 410;
    // have each monster start at a specific frame
    bmpAnimationWaterBottle.currentFrame = 0;
    stage.addChild(bmpAnimationWaterBottle);


    // drag function //
    bmpAnimationBanana.onPress = function(evt) {
        evt.onMouseMove = function(evt) {
            evt.target.x = evt.stageX;
            evt.target.y = evt.stageY;
        }
        evt.onMouseUp = function(evt){
            console.log("up");
            if(evt.target.y < 370)
                evt.target.vX = 0;
            else
                evt.target.vX = 1;
        }
    }

    bmpAnimationCellPhone.onPress = function(evt) {
        evt.onMouseMove = function(evt) {
            evt.target.x = evt.stageX;
            evt.target.y = evt.stageY;

            if(evt.target.y < 370)
                evt.target.vX = 0;
            else
                evt.target.vX = 1;
        }
        evt.onMouseUp = function(evt){
            console.log("up");
        }

    }

    bmpAnimationChips.onPress = function(evt) {
        evt.onMouseMove = function(evt) {
            evt.target.x = evt.stageX;
            evt.target.y = evt.stageY;

            if(evt.target.y < 370)
                evt.target.vX = 0;
            else
                evt.target.vX = 1;
        }
        evt.onMouseUp = function(evt){
            console.log("up");
        }

    }

    bmpAnimationPlasticBag.onPress = function(evt) {
        evt.onMouseMove = function(evt) {
            evt.target.x = evt.stageX;
            evt.target.y = evt.stageY;

            if(evt.target.y < 370)
                evt.target.vX = 0;
            else
                evt.target.vX = 1;
        }
        evt.onMouseUp = function(evt){
            console.log("up");
        }
    }


    bmpAnimationShirt.onPress = function(evt) {
        evt.onMouseMove = function(evt) {
            evt.target.x = evt.stageX;
            evt.target.y = evt.stageY;

            if(evt.target.y < 370)
                evt.target.vX = 0;
            else
                evt.target.vX = 1;
        }
        evt.onMouseUp = function(evt){
            console.log("up");
        }
    }


    bmpAnimationWaterBottle.onPress = function(evt) {
        evt.onMouseMove = function(evt) {
            evt.target.x = evt.stageX;
            evt.target.y = evt.stageY;

            if(evt.target.y < 370)
                evt.target.vX = 0;
            else
                evt.target.vX = 1;
        }
        evt.onMouseUp = function(evt){
            console.log("up");
        }

    }



    // we want to do some work before we update the canvas,
    // otherwise we could use Ticker.addListener(stage);
    createjs.Ticker.addListener(window);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
}

//called if there is an error loading the image (usually due to a 404)
function handleImageError(e) {
    console.log("Error Loading Image : " + e.target.src);
}

function tick() {
    // Hit testing the screen width, otherwise our sprite would disappear

    if (bmpAnimationBanana.x >= screen_width + 160) {
    // We've reached the right side of our screen
    // We need to walk left now to go back to our initial position
        //bmpAnimation.direction = -90;
        bmpAnimationBanana.x = - 100;
    }

    // Moving the sprite based on the direction & the speed
    if (bmpAnimationBanana.direction == 90) {
        bmpAnimationBanana.x += bmpAnimationBanana.vX;
    }

    // cellphone
    if (bmpAnimationCellPhone.x >= screen_width + 160) {
        // We've reached the right side of our screen
        // We need to walk left now to go back to our initial position
        //bmpAnimation.direction = -90;
        bmpAnimationCellPhone.x = - 100;
    }

    // Moving the sprite based on the direction & the speed
    if (bmpAnimationCellPhone.direction == 90) {
        bmpAnimationCellPhone.x += bmpAnimationCellPhone.vX;
    }

    // chips
    if (bmpAnimationChips.x >= screen_width + 160) {
        // We've reached the right side of our screen
        // We need to walk left now to go back to our initial position
        //bmpAnimation.direction = -90;
        bmpAnimationChips.x = - 100;
    }

    // Moving the sprite based on the direction & the speed
    if (bmpAnimationChips.direction == 90) {
        bmpAnimationChips.x += bmpAnimationChips.vX;
    }

    // plastic bag
    if (bmpAnimationPlasticBag.x >= screen_width + 160) {
        // We've reached the right side of our screen
        // We need to walk left now to go back to our initial position
        //bmpAnimation.direction = -90;
        bmpAnimationPlasticBag.x = - 100;
    }

    // Moving the sprite based on the direction & the speed
    if (bmpAnimationPlasticBag.direction == 90) {
        bmpAnimationPlasticBag.x += bmpAnimationPlasticBag.vX;
    }

    // shirt
    if (bmpAnimationShirt.x >= screen_width + 160) {
        // We've reached the right side of our screen
        // We need to walk left now to go back to our initial position
        //bmpAnimation.direction = -90;
        bmpAnimationShirt.x = - 100;
    }

    // Moving the sprite based on the direction & the speed
    if (bmpAnimationShirt.direction == 90) {
        bmpAnimationShirt.x += bmpAnimationShirt.vX;
    }

    // waterbottle
    if (bmpAnimationWaterBottle.x >= screen_width + 160) {
        // We've reached the right side of our screen
        // We need to walk left now to go back to our initial position
        //bmpAnimation.direction = -90;
        bmpAnimationWaterBottle.x = - 100;
    }

    // Moving the sprite based on the direction & the speed
    if (bmpAnimationWaterBottle.direction == 90) {
        bmpAnimationWaterBottle.x += bmpAnimationWaterBottle.vX;
    }


    // update the stage:
    stage.update();
}