/**
 * Created by xaoyang on 12/13/13.
 */
 
function ContentManager(){
    // Method called back once all elements have been downloaded
    var onDownloadCompleted;
    // Number of elements to download;
    var NUM_ELMENTS_TO_DOWNLOAD = 10;

    // setting the callback method
    this.SetDownloadCompleted = function(callbackMethod){
      onDownloadCompleted = callbackMethod;
    };

	// garbage items, need to rename
    this.imgA = new Image();
	this.imgB = new Image();
	this.imgC = new Image(); 
	this.imgD = new Image();
	this.imgE = new Image();
	this.imgF = new Image();
	
	// bin items, need to rename
	this.imgG = new Image();
	this.imgH = new Image();
	this.imgI = new Image();
	this.imgJ = new Image();
		
    var numImagesLoaded = 0;

    // public method to launch the download process
    this.StartDownload = function () {
        // get garbage images
        SetDownload(this.imgA, "src/img/banana.png", handleImageLoad, handleImageError)	;
        SetDownload(this.imgB, "src/img/chips.png", handleImageLoad, handleImageError);
        SetDownload(this.imgC, "src/img/cellphone.png", handleImageLoad, handleImageError);
        SetDownload(this.imgD, "src/img/shirt.png", handleImageLoad, handleImageError);
        SetDownload(this.imgE, "src/img/waterbottle.png", handleImageLoad, handleImageError);
        SetDownload(this.imgF, "src/img/plasticbag.png", handleImageLoad, handleImageError);
        
        // get garbage bin images
        SetDownload(this.imgH, "src/img/landfill.png", handleImageLoad, handleImageError);
        SetDownload(this.imgG, "src/img/compost.png", handleImageLoad, handleImageError)	;
        SetDownload(this.imgI, "src/img/recycle.png", handleImageLoad, handleImageError);
        SetDownload(this.imgJ, "src/img/reuse.png", handleImageLoad, handleImageError);
        
    }
	
	// random garbage
	this.GetGarbage = function (num){
		
		var no_to_img_map = {
			0 : this.imgA,
			1 : this.imgB,
			2 : this.imgC,
			3 : this.imgD,
			4 : this.imgE,
			5 : this.imgF,
		};
		
		return no_to_img_map[num];
	}

	this.GetBin = function (binType) {
		var type_to_img = {
			'compost' : this.imgG,
			'landfill': this.imgH,
			'recycle' : this.imgI,
			'reuse'	  : this.imgJ,
		};
		
		return type_to_img[binType];
	}

    function SetDownload(imgElement, url,loadedHandler, errorHandler){
        
        imgElement.src = url;
        console.log("img source: " + imgElement.src);
        
        imgElement.onload = loadedHandler;
        imgElement.onerror = errorHandler;
    }

    // global handler
    function handleImageLoad(e){
        numImagesLoaded++;

        console.log("images load: " + numImagesLoaded);

        // If all elements have been downloaded
        if(numImagesLoaded === NUM_ELMENTS_TO_DOWNLOAD){
            console.log("all elements have been loaded");
			numImagesLoaded = 0;
			
            onDownloadCompleted();
        }
    }

    function handleImageError(e){
        console.log("Error Loading Image :" + e.target.src);
    }
    
}